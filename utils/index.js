const { DateTime } = require('luxon');

module.exports = {
  format_date: (date) => {
    return DateTime.fromJSDate(date).toFormat('ff');
  },
  toUpperCase: (str) => str.toUpperCase(),
  formatDate: (date) =>{
    var formattedDate = new Date(date);

    // Define the weekday names
    var weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Define the month names
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Extract the relevant date and time information
    var weekday = weekdays[formattedDate.getDay()];
    var month = months[formattedDate.getMonth()];
    var day = formattedDate.getDate();
    var year = formattedDate.getFullYear();
    var hours = formattedDate.getHours();
    var minutes = formattedDate.getMinutes().toString();

    // Convert hours to AM/PM format
    var period = 'AM';
    if (hours >= 12) {
      period = 'PM';
      if (hours > 12) {
        hours -= 12;
      }
    }

    // Pad minutes with leading zero if necessary
    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }

    // Return the formatted date string
    return weekday + ' ' + month + ' ' + day + ' ' + year + ' ' + hours + ':' + minutes + ' ' + period;
}
};