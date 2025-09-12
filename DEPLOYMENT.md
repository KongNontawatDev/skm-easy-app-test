# การ Deploy บน Vercel

## ไฟล์ที่จำเป็นสำหรับ Vercel

### 1. vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm ci",
  "devCommand": "npm run dev",
  "functions": {
    "src/api/**/*.ts": {
      "runtime": "nodejs18.x"
    }
  },
  "build": {
    "env": {
      "NODE_ENV": "production"
    }
  }
}
```

### 2. .nvmrc
```
18
```

### 3. .vercelignore
```
node_modules
.git
.env.local
.env.development.local
.env.test.local
.env.production.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.DS_Store
.vscode
.idea
*.log
coverage
.nyc_output
dist
```

## การแก้ไขปัญหา

### ปัญหา Permission Denied
- ใช้ `npx vite build` แทน `vite build` ใน package.json
- ใช้ `npm ci` แทน `npm install` สำหรับ production

### ปัญหา Terser
- เปลี่ยน minifier เป็น `esbuild` ใน vite.config.ts
- esbuild เร็วกว่าและไม่ต้องการ dependencies เพิ่มเติม

### การตั้งค่า Vite
- ใช้ `esbuild` สำหรับ minification
- เปิดใช้ code splitting
- ตั้งค่า manual chunks สำหรับ vendor libraries

## ขั้นตอนการ Deploy

1. Push โค้ดไปยัง GitHub repository
2. เชื่อมต่อ Vercel กับ GitHub repository
3. Vercel จะ detect Vite framework อัตโนมัติ
4. Build จะทำงานโดยใช้ `npm run build`
5. Output จะอยู่ใน `dist` directory

## Environment Variables

หากต้องการใช้ environment variables:
1. ไปที่ Vercel Dashboard
2. เลือก Project
3. ไปที่ Settings > Environment Variables
4. เพิ่ม variables ที่จำเป็น

## การตรวจสอบ Build

```bash
# ทดสอบ build ในเครื่อง
npm run build

# ทดสอบ preview
npm run preview
```
