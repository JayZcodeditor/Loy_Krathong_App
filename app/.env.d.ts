interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_API_URL_PRODUCTION: string;
    // เพิ่มตัวแปรอื่น ๆ ที่ต้องการใช้ใน .env เช่น:
    // readonly VITE_API_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
