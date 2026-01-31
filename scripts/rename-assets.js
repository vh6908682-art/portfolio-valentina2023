/**
 * Rename all folders and files in src/assets/projects to lowercase.
 * Run: node scripts/rename-assets.js
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const projectsDir = path.join(__dirname, "..", "src", "assets", "projects");

function renameToLowerCase(filePath) {
  const dir = path.dirname(filePath);
  const base = path.basename(filePath);
  const lower = base.toLowerCase();
  if (base === lower) return filePath;
  const newPath = path.join(dir, lower);
  fs.renameSync(filePath, newPath);
  return newPath;
}

// Rename folders (two-step for case-insensitive Windows)
const folders = fs.readdirSync(projectsDir);
for (const folder of folders) {
  const folderPath = path.join(projectsDir, folder);
  if (!fs.statSync(folderPath).isDirectory()) continue;
  const lower = folder.toLowerCase();
  if (folder === lower) continue;
  const tmpPath = path.join(projectsDir, folder + "_tmp");
  fs.renameSync(folderPath, tmpPath);
  fs.renameSync(tmpPath, path.join(projectsDir, lower));
  console.log(`Renamed folder: ${folder} -> ${lower}`);
}

// Rename files in each folder
const newFolders = fs.readdirSync(projectsDir);
for (const folder of newFolders) {
  const folderPath = path.join(projectsDir, folder);
  if (!fs.statSync(folderPath).isDirectory()) continue;
  const files = fs.readdirSync(folderPath);
  for (const file of files) {
    const filePath = path.join(folderPath, file);
    if (fs.statSync(filePath).isDirectory()) continue;
    const lower = file.toLowerCase();
    if (file === lower) continue;
    const tmpPath = path.join(folderPath, file + "_tmp");
    fs.renameSync(filePath, tmpPath);
    fs.renameSync(tmpPath, path.join(folderPath, lower));
    console.log(`Renamed file: ${folder}/${file} -> ${folder}/${lower}`);
  }
}

console.log("Done! All assets renamed to lowercase.");
