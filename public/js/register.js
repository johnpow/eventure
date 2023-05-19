const signupFormHandler = async (event) => {
    console.log("signupFormHandler called");
    event.preventDefault();
  
    const username = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (!username || !email || !password) {
      return alert("Please enter all fields");
    }
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {

        document.location.replace('/');

      } else {
        alert(response.statusText);
      }


    } catch (err) {
      alert(err.message);
    }
  };


document
    .querySelector('#signupBtn')
    .addEventListener('click', signupFormHandler);  