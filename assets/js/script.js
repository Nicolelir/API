const API_KEY = "I9lJiFoKv1ISLMYbqL8PwiNGORM";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

//Now need to wire up the button, and then we'll need two more functions.
//One to fetch the data and the other to display it.
//So let’s wire up our button first.

// standard event listener, 
document.getElementById("status").addEventListener("click", e => getStatus(e)); //get the element with the ID of status which is our button.
// then we're going to call  the git status function. Now we're passing in 'e' there which is a reference to the event.

//getStatus function, it needs to perform just two tasks.
async function getStatus(e) {

    const queryString = `${API_URL}?api_key=${API_KEY}`;//it needs to make a  GET request to the API_URL with the API_KEY.

    const response = await fetch(queryString);//it needs to pass this data to a function that will display it.

    const data = await response.json();//When the response comes back, we'll need to convert it to json.

/*If everything has gone well, a property is set on the response object.
And this property is the “ok” property.
If the server returns the HTTP status code of 200 then, then you’ll remember, our request
has been successful and the “ok” property will be set to True.
If it returns an error code, then the “ok” property will be set to false.
For now, let’s add an if to check if our response.ok property is set to True.
And if it is, we'll console.log out our response.*/

    if (response.ok) {
        displayStatus(data); //to display the data in our modal
    } else {
        throw new Error(data.error);
    }

}
//Instead of console logging our data we'll call  the display status function with it instead.
function displayStatus(data) {

    let heading = "API Key Status"; //our display  status function needs to set the heading text to API key status
    let results = `<div>Your key is valid until</div>`; //it needs to set the body  text to, "your key is valid until" and the date, and it needs to show the modal
    results += `<div class="key-status">${data.expiry}</div>`;

    //resultsModalTitle”, and the  ID for the body is “results-content”. 
    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    resultsModal.show();
}
    /*I set the  heading text to API key status  
I set the results variable to the content that  I want in the body using template literals.  
Then using document.getElementById and the  IDs I gave you earlier I set the content.  
And finally, the results modal is shown*/


