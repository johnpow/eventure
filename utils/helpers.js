module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  dotdotdot: (str) => {
    if (str.length > 400)
      return str.substring(0,400) + '...';
    return str;
},
formatDate: (date) =>{
  // Create a new Date object from the input date string
  var formattedDate = new Date(date);

  // Extract the relevant date and time information
  var year = formattedDate.getFullYear();
  var month = formattedDate.getMonth() + 1; // Months are zero-based
  var day = formattedDate.getDate();
  var hours = formattedDate.getHours();
  var minutes = formattedDate.getMinutes();

  // Return the formatted date string
  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;
},
};

