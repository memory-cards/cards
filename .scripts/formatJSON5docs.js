const glob = require('glob');
const fs = require('fs');
const json5 = require('json5');

const cmd = process.argv.join(' ');
const isValidate = cmd.includes('--validate');

const json5files = glob.sync('./**/*.json5', {
  ignore: ['./node_modules/**/*.*'],
});
const nonFormattedFiles = [];
json5files.forEach(fileName => {
  const content = fs.readFileSync(fileName).toString();
  const data = json5.parse(content);
  const newContent = json5.stringify(data, null, 2);
  if (newContent.trim() !== content.trim()) {
    if (!isValidate) {
      fs.writeFileSync(fileName, newContent);
    }
    nonFormattedFiles.push(fileName);
  }
});

console.log(
  `${nonFormattedFiles.length} json5-file(s) ${
    isValidate ? 'should be' : ''
  } reformatted`,
);

if (isValidate && nonFormattedFiles.length) {
  console.log(nonFormattedFiles.join('\n'));
  process.exit(1);
}
