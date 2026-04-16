const fs = require('fs');

// Load JSON data and the current README
const data = JSON.parse(fs.readFileSync('./profile.json', 'utf8'));
let readme = fs.readFileSync('./README.md', 'utf8');

// Build the markdown block for experience
const expMd = data.experience.map(item => {
  const bullets = item.highlights.map(h => `* ${h}`).join('\n');
  return `### **${item.role}** for ${item.company}\n*_(${item.period})_*\n\n${bullets}`;
}).join('\n\n---\n\n');

// Replace everything between the markers
const startMarker = '---';
const endMarker = '---';
const regex = new RegExp(`(${startMarker})[\\s\\S]*?(${endMarker})`);

readme = readme.replace(regex, `$1\n${expMd}\n$2`);

// Save the updated README
fs.writeFileSync('./README.md', readme);
console.log('README.md updated successfully!');
