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
}
};

