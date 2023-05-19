// const $commentForm = document.querySelector('#comment-form');
const $parentDiv = document.querySelector('#parent');
const $manageEvent = document.querySelector('#manageEvent');



const createSignUp = async (event) => {
    event.preventDefault();
    let e = event.target;
    if (e.matches('.signupBtn')) {
        const activity_id = e.getAttribute('data-id');
    
        console.log(activity_id);

        try{
            const response = await fetch('/api/signup', {
                method: 'POST',
                body: JSON.stringify({ activity_id }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/');
            } else {
                alert(response.statusText);
            }
        } catch (err) {
            alert(err);
        }

    }
};

const deleteSignUp = async (event) => {
    console.log('deleteSignUp');
    let e = event.target;
    event.preventDefault();
    if(e === $manageEvent) {
        const href = e.getAttribute('href');
        document.location.replace(href);  
    }
    
    if (e.matches('.dropSupBtn')) {
        const activity_id = e.getAttribute('data-id');
    
        console.log(activity_id);

        try{
            const response = await fetch(`/api/signup/${activity_id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/');
            } else {
                alert(response.statusText);
            }
        } catch (err) {
            alert(err);
        }

    }
};




$parentDiv.addEventListener('click', createSignUp);
$parentDiv.addEventListener('click', deleteSignUp);