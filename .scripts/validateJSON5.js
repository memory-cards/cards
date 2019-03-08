const glob = require('glob');
const childProcess = require('child_process');

const json5files = glob.sync('./**/*.json5', {
  ignore: ['./node_modules/**/*.*'],
});
json5files.forEach(fileName => {
  childProcess.execSync(`npx json5 --validate ${fileName}`);
});
