const glob = require('glob');
const fs = require('fs');
const json5 = require('json5');

const cmd = process.argv.join(' ');
const validate = cmd.includes('--validate');

const json5files = glob.sync('./**/*.json5');
let counter = 0;
json5files.forEach(fileName => {
  const content = fs.readFileSync(fileName).toString();
  const data = json5.parse(content);
  const newContent = json5.stringify(data, null, 2);
  if (newContent !== content) {
    if (!validate) {
      fs.writeFileSync(fileName, newContent);
    }
    counter++;
  }
});

console.log(
  `${counter} json5-file(s) ${validate ? 'should be' : ''} reformatted`,
);

if (validate && counter) {
  process.exit(1);
}
