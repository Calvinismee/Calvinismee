const fs = require('fs');

// 1. Load JSON data and the current README
const data = JSON.parse(fs.readFileSync('./profile.json', 'utf8'));
let readme = fs.readFileSync('./README.md', 'utf8');

// 2. Build the markdown block for experience
const expMd = data.experience.map(item => {
  const bullets = item.highlights.map(h => `* ${h}`).join('\n');
  return `### **${item.role}** for ${item.company}\n*_(${item.period})_*\n\n${bullets}`;
}).join('\n\n---\n\n');

// 3. Use your ACTUAL headers as the markers! No more hidden HTML comments.
const startMarker = '<h2 id="experience">💡 Experience</h2>';
const endMarker = '<h2 id="connect">📫 Connect with Me</h2>';

// 4. Regex to grab everything between those two headers
const regex = new RegExp(`(${startMarker})[\\s\\S]*?(${endMarker})`);

// 5. Inject the headers, the horizontal lines (---), and your experience
readme = readme.replace(regex, `$1\n\n---\n\n${expMd}\n\n---\n\n$2`);

// 6. Save it
fs.writeFileSync('./README.md', readme);
console.log('README.md updated perfectly with no hidden markers!');
