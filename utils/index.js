const { DateTime } = require('luxon');

module.exports = {
  format_date: (date) => {
    return DateTime.fromJSDate(date).toFormat('ff');
  },
  toUpperCase: (str) => str.toUpperCase(),
};