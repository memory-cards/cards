const glob = require('glob');
const fs = require('fs');
const json5 = require('json5');

const json5files = glob.sync('./**/*.json5');
let counter = 0;
json5files.forEach((fileName) => {
  const content = fs.readFileSync(fileName).toString();
  const data = json5.parse(content);
  const newContent = json5.stringify(data, null, 2);
  if (newContent !== content) {
    fs.writeFileSync(fileName, newContent);
    counter ++;
  }
});

console.log(`${counter} json5-file(s) reformatted`);