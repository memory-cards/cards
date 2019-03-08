const glob = require('glob');
const fs = require('fs');
const json5 = require('json5');

const cmd = process.argv.join(' ');
const validate = cmd.includes('--validate');

const json5files = glob.sync('./**/*.json5');
const nonFormattedFiles = [];
json5files.forEach(fileName => {
  const content = fs.readFileSync(fileName).toString();
  const data = json5.parse(content);
  const newContent = json5.stringify(data, null, 2);
  if (newContent.trim() !== content.trim()) {
    if (!validate) {
      fs.writeFileSync(fileName, newContent);
    }
    nonFormattedFiles.push(fileName);
  }
});

console.log(
  `${nonFormattedFiles.length} json5-file(s) ${validate ? 'should be' : ''} reformatted`,
);

if (validate && nonFormattedFiles.length) {
  console.log(nonFormattedFiles.join('\n'));
  process.exit(1);
}
