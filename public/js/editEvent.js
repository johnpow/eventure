const $title = document.getElementById('title');
const $date = document.getElementById('date');
const $time = document.getElementById('time');
const $location = document.getElementById('location');
const $category = document.getElementById('category');
const $description = document.getElementById('description');
const $updateBtn = document.getElementById('updateBtn');
const $deleteBtn = document.getElementById('deleteBtn');
const $eventForm = document.getElementById('eventForm');


const updateEvent = async (event) => {
    event.preventDefault();

    const activity_title = $title.value.trim();
    const activity_description = $description.value.trim();
    const date = $date.value.trim();
    const time = $time.value.trim();
    const activity_location = $location.value.trim();
    const activity_category = $category.value.trim();
    const activity_date = date.split("/").reverse().join("-") + " " + time+":00";
    const id = $eventForm.dataset.id;

    
    if(!activity_title || !date || !time || !activity_location || !activity_category){
        const myModal = new bootstrap.Modal(document.getElementById("updateModal"));
          document.querySelector('#errorText').textContent = "Please fill out all fields";
          myModal.show();
          document.getElementById("updateModal").addEventListener('hidden.bs.modal', function() {
            location.reload();
          });
        return;
    }

    try{
        const response = await fetch(`/api/editEvent/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ activity_title, activity_description, activity_date, activity_location, activity_category }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    } catch (err) {
        alert(err);
    }
};

const deleteEvent = async (event) => {
    event.preventDefault();

    const id = $eventForm.dataset.id;

    try{
        const response = await fetch(`/api/activity/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    } catch (err) {
        alert(err);
    }
};

$updateBtn.addEventListener('click', updateEvent);
$deleteBtn.addEventListener('click', deleteEvent);
