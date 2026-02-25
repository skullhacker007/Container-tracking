import fs from "fs";
import path from "path";

const baseDir = process.cwd();

/* ================================
   DASHBOARD ROUTES (ALL INSIDE)
================================ */

const dashboardRoutes = [
  "src/app/dashboard",
  "src/app/dashboard/orders",
  "src/app/dashboard/transports",
  "src/app/dashboard/transports/[id]",
  "src/app/dashboard/containers",
  "src/app/dashboard/containers/[id]",
  "src/app/dashboard/routes",
  "src/app/dashboard/routes/[id]",
  "src/app/dashboard/tracking",
  "src/app/dashboard/analytics",
  "src/app/dashboard/pod",
  "src/app/dashboard/invoice",
  "src/app/dashboard/settings",
];

/* ================================
   OTHER CORE FOLDERS
================================ */

const folders = [
  "src/components",
  "src/components/layout",
  "src/components/cards",
  "src/components/tables",
  "src/components/charts",
  "src/components/maps",
  "src/components/dashboard",

  "src/features",
  "src/features/transport",
  "src/features/container",
  "src/features/route",
  "src/features/simulation",

  "src/data",
  "src/hooks",
  "src/lib",
  "src/types",
  "src/services",
];

/* ================================
   HELPERS
================================ */

function createFolder(folderPath) {
  const fullPath = path.join(baseDir, folderPath);

  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✅ Created folder: ${folderPath}`);
  } else {
    console.log(`⏭ Folder exists: ${folderPath}`);
  }
}

function createEmptyFile(filePath) {
  const fullPath = path.join(baseDir, filePath);

  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, "");
    console.log(`📄 Created file: ${filePath}`);
  } else {
    console.log(`⏭ File exists: ${filePath}`);
  }
}

/* ================================
   EXECUTION
================================ */

console.log("\n🚀 Creating clean dashboard structure...\n");

// Create dashboard routes + empty files
dashboardRoutes.forEach((routePath) => {
  createFolder(routePath);

  createEmptyFile(`${routePath}/page.tsx`);
  createEmptyFile(`${routePath}/page.module.css`);
});

// Create dashboard layout files
createEmptyFile("src/app/dashboard/layout.tsx");
createEmptyFile("src/app/dashboard/layout.module.css");

// Create other folders
folders.forEach(createFolder);

console.log("\n✨ Structure ready!\n");