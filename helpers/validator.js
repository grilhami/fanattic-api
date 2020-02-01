const validator = require('validator');

module.exports = data => {
  const validationResults = [];
  Object.keys(data).forEach(item => {
    if (item === 'email') {
      if (!validator.isEmail(data[item])) {
        validationResults.push({
          field: item,
          error: 'Invalid Email Format',
        });
      }
    } else if (validator.isEmpty(data[item])) {
      validationResults.push({ field: item, error: 'Cannot be empty' });
    }
  });

  return validationResults;
};
