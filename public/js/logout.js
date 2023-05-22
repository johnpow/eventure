// Initiate logout process
const logout = async () => {
  // Calls the api route to logout
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

// Event listener for the logout button
document.querySelector('#logout').addEventListener('click', logout);
