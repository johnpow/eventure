const $title = document.querySelector('#title');
const $description = document.querySelector('#description');
const $date = document.querySelector('#date');
const $time = document.querySelector('#time');
const $location = document.querySelector('#location');
const $category = document.querySelector('#category');
const $createBtn = document.querySelector('#createBtn');

// A function to create a new event
const createActivity = async (event) => {
    event.preventDefault();

    const activity_title = $title.value.trim();
    const activity_description = $description.value.trim();
    const date = $date.value.trim();
    const time = $time.value.trim();
    const activity_date = date+ " " + time+":00";
    const activity_location = $location.value.trim();
    const activity_category = $category.value.trim();

    // Checks if all fields are filled out
    if(!activity_title || !activity_description || !date || !time || !activity_location){
        const myModal = new bootstrap.Modal(document.getElementById("createModal"));
          document.querySelector('#errorText').textContent = "Please fill out all fields";
          myModal.show();
          document.getElementById("createModal").addEventListener('hidden.bs.modal', function() {
            location.reload();
          });
        return;
    }

    try{
        // Sends a POST request to the api route to create a new event
        const response = await fetch('/api/activity', {
            method: 'POST',
            body: JSON.stringify({ activity_title, activity_description, activity_date, activity_location, activity_category }),
            headers: { 'Content-Type': 'application/json' },
        });
        // If successful, redirect the browser to the dashboard page
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    } catch (err) {
        alert(err);
    }
};

// Event listener for the create event button
$createBtn.addEventListener('click', createActivity);