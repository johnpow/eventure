const $parentDiv = document.querySelector('#parent');
const $manageEvent = document.querySelector('#manageEvent');


// A function to create a new signup for an event by the user
const createSignUp = async (event) => {
    event.preventDefault();
    let e = event.target;
    // checks if the target is the signup button
    if (e.matches('.signupBtn')) {
        const activity_id = e.getAttribute('data-id');

        // sends a POST request to the api route to signup the user for an event
        try{
            const response = await fetch('/api/signup', {
                method: 'POST',
                body: JSON.stringify({ activity_id }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                location.reload();;
            } else {
                alert(response.statusText);
            }
        } catch (err) {
            alert(err);
        }

    }
};

// A function to delete a signup for an event by the user
const deleteSignUp = async (event) => {
    let e = event.target;
    event.preventDefault();
    // checks if the target is the manage event button and redirects to the manage event page
    if(e === $manageEvent) {
        const href = e.getAttribute('href');
        document.location.replace(href);  
    }
    // checks if the target is the drop event button
    if (e.matches('.dropSupBtn')) {
        const activity_id = e.getAttribute('data-id');
    
        // sends a DELETE request to the api route to delete the signup for an event
        try{
            const response = await fetch(`/api/signup/${activity_id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                location.reload();;
            } else {
                alert(response.statusText);
            }
        } catch (err) {
            alert(err);
        }

    }
};



// Event listener for the signup button    
$parentDiv.addEventListener('click', createSignUp);
// Event listener for the drop event button
$parentDiv.addEventListener('click', deleteSignUp);