const fs = require('fs');
const path = require('path');

const logs = [
  "C:\\Users\\Ashikur Rahman\\.gemini\\antigravity\\brain\\2267a1a8-22a1-4ea7-923b-9983322131a9\\.system_generated\\logs\\overview.txt",
  "C:\\Users\\Ashikur Rahman\\.gemini\\antigravity\\brain\\b8a39169-ac0e-43c8-8c11-18884e9c8fb0\\.system_generated\\logs\\overview.txt"
];

for (const logFile of logs) {
  if (!fs.existsSync(logFile)) {
    console.log("Log not found: " + logFile);
    continue;
  }
  const content = fs.readFileSync(logFile, 'utf8');
  const lines = content.split('\n');
  for (const line of lines) {
    if (!line.trim()) continue;
    try {
      const parsed = JSON.parse(line);
      // Check tool_calls for write_to_file
      if (parsed.tool_calls) {
        for (const call of parsed.tool_calls) {
          if (call.name === 'write_to_file' || call.name === 'replace_file_content') {
            const target = call.args.TargetFile;
            let code = call.args.CodeContent;
            
            // if replace_file_content, it might not be full file but if we have no file, let's skip
            // We just want write_to_file
            if (call.name === 'write_to_file' && target && code) {
              const dir = path.dirname(target);
              if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
              fs.writeFileSync(target, code);
              console.log('Restored from write_to_file: ' + target);
            }
          }
        }
      }
      
      // Check for view_file output to get the exact state
      if (parsed.type === 'TOOL_CALL_OUTPUT' && parsed.tool_calls) {
         for (const call of parsed.tool_calls) {
           if (call.name === 'view_file' && call.output) {
             const matchPath = call.output.match(/File Path: `file:\/\/\/(.*?)`/);
             if (matchPath) {
               const p = decodeURIComponent(matchPath[1]);
               const linesMatch = call.output.split('\n');
               let codeLines = [];
               for (const l of linesMatch) {
                 const lineMatch = l.match(/^\d+: (.*)/);
                 if (lineMatch) {
                   codeLines.push(lineMatch[1]);
                 }
               }
               if (codeLines.length > 0) {
                 const target = p.replace(/\//g, '\\');
                 const dir = path.dirname(target);
                 if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
                 fs.writeFileSync(target, codeLines.join('\n'));
                 console.log('Restored from view_file: ' + target);
               }
             }
           }
         }
      }
    } catch (e) {
      // ignore JSON parse errors
    }
  }
}
