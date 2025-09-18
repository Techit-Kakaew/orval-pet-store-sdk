import fs from "fs";

const filePath = "src/generated/api.ts";

if (fs.existsSync(filePath)) {
  const content = fs.readFileSync(filePath, "utf8");
  // ถ้ายังไม่มี ts-nocheck ค่อยใส่
  if (!content.startsWith("// @ts-nocheck")) {
    fs.writeFileSync(filePath, "// @ts-nocheck\n" + content, "utf8");
    console.log("✅ Added // @ts-nocheck to", filePath);
  } else {
    console.log("ℹ️ Already has // @ts-nocheck");
  }
} else {
  console.warn("⚠️ File not found:", filePath);
}
