const fs = require('fs');

// Load data
const data = JSON.parse(fs.readFileSync('./profile.json', 'utf8'));
let readme = fs.readFileSync('./README.md', 'utf8');

// Format Experience to match your existing style
const expMd = data.experience.map(item => {
  const bulletPoints = item.highlights.map(point => `* ${point}`).join('\n');
  return `### **${item.role}** for ${item.company}\n*_(${item.period})_*\n\n${bulletPoints}\n\n---`;
}).join('\n\n');

// Replace content between markers
const regex = /[\s\S]*/;
const newContent = `\n\n${expMd}\n\n`;

if (regex.test(readme)) {
  readme = readme.replace(regex, newContent);
  fs.writeFileSync('./README.md', readme);
  console.log('Successfully synced experience to README!');
} else {
  console.error('Markers not found in README.md');
}
