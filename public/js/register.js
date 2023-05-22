const signupFormHandler = async (event) => {
    console.log("signupFormHandler called");
    event.preventDefault();
  
    const username = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const myModal = new bootstrap.Modal(document.getElementById("registerModal"));

    if (!username || !email || !password) {
      document.querySelector('#errorText').textContent = 'Please fill out all fields';
      myModal.show();
      document.getElementById("registerModal").addEventListener('hidden.bs.modal', function() {
        location.reload();
      });
      return;
    }
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

        myModal.show();
        document.getElementById("registerModal").addEventListener('hidden.bs.modal', function() {
          location.reload();
        });
    }
  };


document
    .querySelector('#signupBtn')
    .addEventListener('click', signupFormHandler);  