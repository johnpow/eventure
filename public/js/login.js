const loginFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const email = document.querySelector('#typeEmailX').value.trim();
    const password = document.querySelector('#typePasswordX').value.trim();
    const myModal = new bootstrap.Modal(document.getElementById("loginModal"));
    if(!email || !password){
      document.querySelector('#errorText').textContent = 'Please fill out all fields';
      myModal.show();
      document.getElementById("loginModal").addEventListener('hidden.bs.modal', function() {
        location.reload();
      })
      return;
    }
  
    if (email && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/');
      } else {
          document.querySelector('#errorText').textContent = 'Incorrect email or password, please try again';
          myModal.show();
          document.getElementById("loginModal").addEventListener('hidden.bs.modal', function() {
            location.reload();
        })
      }
    }
  };
  
  
  
  document
    .querySelector('#loginBtn')
    .addEventListener('click', loginFormHandler);
  

  