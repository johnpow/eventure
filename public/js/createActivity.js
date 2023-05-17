const $title = document.querySelector('#title');
const $description = document.querySelector('#description');
const $date = document.querySelector('#date');
const $time = document.querySelector('#time');
const $location = document.querySelector('#location');
const $category = document.querySelector('#category');
const $createBtn = document.querySelector('#createBtn');

// Calls the api to create a new blog post
const createActivity = async (event) => {
    event.preventDefault();

    const activity_title = $title.value.trim();
    const activity_description = $description.value.trim();
    const date = $date.value.trim();
    const time = $time.value.trim();
    const activity_date = date.split("/").reverse().join("-") + " " + time+":00";
    console.log(activity_date);
    const activity_location = $location.value.trim();
    const activity_category = $category.value.trim();
    


    if(!activity_title || !activity_description || !date || !time || !activity_location){
        return alert('Please fill out all fields!');
    }

    try{
        const response = await fetch('/api/activity', {
            method: 'POST',
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

$createBtn.addEventListener('click', createActivity);