require('json5/lib/register');

const glob = require('glob');
const path = require('path');

let errors = [];
const json5files = glob.sync('./**/*.json5', {
  ignore: ['./node_modules/**/*.*'],
});

json5files.forEach(cardFileName => {
  const filePath = path.resolve('.', cardFileName);
  const cardContent = require(filePath);
  const type = cardContent.type;
  try {
    const validator = require(`card-types/types/${type}/validator`);
    const validationResult = validator(cardContent);
    if (!validationResult) {
      errors.push(`${cardFileName} - has invalid content`);
    }
  } catch (e) {
    errors.push(`${cardFileName} - ${e.message}`);
  }
});

if (errors.length) {
  console.log('Errors:\n', errors.join('\n'));
  process.exit(1);
}
