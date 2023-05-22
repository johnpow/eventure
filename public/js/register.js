// A function to handle the registration of new users
const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    // defines a modal
    const myModal = new bootstrap.Modal(document.getElementById("registerModal"));

    // Checks if all fields are filled out
    if (!username || !email || !password) {
      document.querySelector('#errorText').textContent = 'Please fill out all fields';
      myModal.show();
      document.getElementById("registerModal").addEventListener('hidden.bs.modal', function() {
        location.reload();
      });
      return;
    }
    // sends a POST request to the api route to register a new user
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (response.ok) {
      document.location.replace('/');
    } else {
        if(data.errors[0].message === "email must be unique"){
          document.querySelector('#errorText').textContent = "Email already exists";
        } else if(data.errors[0].message === "username must be unique"){
          document.querySelector('#errorText').textContent = "Username already exists";
        } else if(data.errors[0].message === "Validation len on password failed"){
          document.querySelector('#errorText').textContent = "Password must be at least 8 characters";
        } else {
          document.querySelector('#errorText').textContent = data.errors[0].message;
        }
        // Shows the modal with the error message
        myModal.show();
        document.getElementById("registerModal").addEventListener('hidden.bs.modal', function() {
          location.reload();
        });
    }
  };

// Event listener for the signup button
document
    .querySelector('#signupBtn')
    .addEventListener('click', signupFormHandler);  