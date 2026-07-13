const fs = require('fs');
const path = require('path');

const historyDir = 'C:\\Users\\Ashikur Rahman\\AppData\\Roaming\\Code\\User\\History';
const targetPrefix = 'file:///e%3A/Projects/Assignment-TS-01/shobuj-bangla/';
const outDir = 'e:\\Projects\\Assignment-TS-01\\shobuj-bangla';

if (!fs.existsSync(historyDir)) {
  console.log("History dir not found");
  process.exit(1);
}

const folders = fs.readdirSync(historyDir);
let restoredCount = 0;

for (const folder of folders) {
  const folderPath = path.join(historyDir, folder);
  const stat = fs.statSync(folderPath);
  if (!stat.isDirectory()) continue;
  
  const entriesFile = path.join(folderPath, 'entries.json');
  if (!fs.existsSync(entriesFile)) continue;
  
  try {
    const data = JSON.parse(fs.readFileSync(entriesFile, 'utf8'));
    if (data.resource && data.resource.toLowerCase().startsWith(targetPrefix.toLowerCase())) {
      const relativePath = decodeURIComponent(data.resource.substring(targetPrefix.length));
      const outPath = path.join(outDir, relativePath);
      
      // Get latest entry
      const entries = data.entries || [];
      if (entries.length === 0) continue;
      
      entries.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      const latestId = entries[0].id;
      
      const sourceFile = path.join(folderPath, latestId);
      if (fs.existsSync(sourceFile)) {
        // Create dir if needed
        const dir = path.dirname(outPath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        
        fs.copyFileSync(sourceFile, outPath);
        console.log('Restored: ' + relativePath);
        restoredCount++;
      }
    }
  } catch (e) {
    // skip errors
  }
}

console.log('Total files restored: ' + restoredCount);
