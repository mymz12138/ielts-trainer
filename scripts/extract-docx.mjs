import { execSync } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import { join, basename } from "node:path";

function runPS(script) {
  const bytes = Buffer.from(script, "utf16le");
  const b64 = bytes.toString("base64");
  return execSync(`powershell -NoProfile -EncodedCommand ${b64}`, {
    encoding: "utf8", maxBuffer: 200 * 1024 * 1024,
  });
}

const source = "D:\\SU素材\\pack";
const dest = "d:\\作业\\ielts-trainer\\scripts\\_raw";
mkdirSync(dest, { recursive: true });

// 1. 列出所有 docx
const findScript = `[Console]::OutputEncoding=[Text.Encoding]::UTF8; Get-ChildItem -LiteralPath '${source}' -Recurse -Filter *.docx | ForEach-Object { $_.FullName }`;
const files = runPS(findScript).split(/\r?\n/).map(s => s.trim()).filter(Boolean);
console.log(`found ${files.length} docx files`);

// 2. 逐个提取 document.xml 文本
for (const f of files) {
  const extractScript = `
    [Console]::OutputEncoding=[Text.Encoding]::UTF8
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    $z = [System.IO.Compression.ZipFile]::OpenRead('${f}')
    $e = $z.GetEntry('word/document.xml')
    $r = New-Object System.IO.StreamReader($e.Open())
    $x = $r.ReadToEnd()
    $r.Close()
    $z.Dispose()
    [Console]::Out.Write($x)
  `;
  const xml = runPS(extractScript);
  // 按段落切分，合并同段内的 w:t
  const paras = xml.split("</w:p>");
  const lines = paras.map(p => {
    const matches = [...p.matchAll(/<w:t[^>]*>([^<]*)<\/w:t>/g)];
    return matches.map(m => m[1]).join("");
  });
  const name = basename(f).replace(/\.docx$/i, "");
  writeFileSync(join(dest, name + ".txt"), lines.join("\n"), "utf8");
  console.log(`OK: ${name} -> ${lines.length} paragraphs, ${xml.length} xml chars`);
}
console.log("ALL DONE");
