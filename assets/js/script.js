//1 Making a Request - Part 1
const API_KEY = "I9lJiFoKv1ISLMYbqL8PwiNGORM";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

//2. Now need to wire up the button, and then we'll need two more functions.
//One to fetch the data and the other to display it.
//So let’s wire up our button first.
//standard event listener, 
document.getElementById("status").addEventListener("click", e => getStatus(e)); //get the element with the ID of status which is our button.
// then we're going to call  the git status function. Now we're passing in 'e' there which is a reference to the event.

//10. Making a POST Request
document.getElementById("submit").addEventListener("click", e => postForm(e));

//11. It needs  to be an async function. So that we can await the results of our promise.  It's called postForm as we said above. 
// FormData interface: it can capture all of the fields in a HTML form and return it as an object and we can give this objects to fetch
async function postForm(e) {

    const form = new FormData(document.getElementById("checksform"));

    const response = await fetch(API_URL, { //waiting for promise
        method: "POST",
        headers: {
            "Authorization": API_KEY,
        },
        body: form, // addind this line we send the form data to the API
    });


//12. //10. Making a POST Request part 2... we need to convert the  response to json and display it. 
const data = await response.json();

    if (response.ok) {
        displayErrors(data);
    } else {
        throw new Error(data.error);
    }

}


// 3 getStatus function, it needs to perform just two tasks.
async function getStatus(e) {

    const queryString = `${API_URL}?api_key=${API_KEY}`;//it needs to make a  GET request to the API_URL with the API_KEY.

    const response = await fetch(queryString);//it needs to pass this data to a function that will display it.

    const data = await response.json();//When the response comes back, we'll need to convert it to json.

/*If everything has gone well, a property is set on the response object.
And this property is the “ok” property.
If the server returns the HTTP status code of 200 then, then you’ll remember, our request
has been successful and the “ok” property will be set to True.
If it returns an error code, then the “ok” property will be set to false.

4. For now, let’s add an if to check if our response.ok property is set to True.
And if it is, we'll console.log out our response.*/

    if (response.ok) {
        displayStatus(data); // 5 to display the data in our modal
    } else {
        throw new Error(data.error);
    }

}

//13. to format the response (take in data as a parameter again)
//set a heading
//if statement
//iterate through each of those errors.   
function displayErrors(data) {

    let results = "";

    let heading = `JSHint Results for ${data.file}`;
    if (data.total_errors === 0) {
        results = `<div class="no_errors">No errors reported!</div>`;
    } else {
        results = `<div>Total Errors: <span class="error_count">${data.total_errors}</span></div>`;
        for (let error of data.error_list) {
            results += `<div>At line <span class="line">${error.line}</span>, `;
            results += `column <span class="column">${error.col}:</span></div>`;
            results += `<div class="error">${error.error}</div>`;
        }
    }

    //14. set the heading in the modal,  
    //set the content in the  modal
    // display the modal.  
    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    resultsModal.show();
}

//6 Instead of console logging our data we'll call  the display status function with it instead.
function displayStatus(data) {

    // 8 ....................
    let heading = "API Key Status"; //our display  status function needs to set the heading text to API key status
    let results = `<div>Your key is valid until</div>`; //it needs to set the body  text to, "your key is valid until" and the date, and it needs to show the modal
    results += `<div class="key-status">${data.expiry}</div>`;

    // 9 resultsModalTitle”, and the  ID for the body is “results-content”. 
    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    // 7 .................
    resultsModal.show();//shows api key status and valid until..date
}
    /*I set the  heading text to API key status  
I set the results variable to the content that  I want in the body using template literals.  
Then using document.getElementById and the  IDs I gave you earlier I set the content.  
And finally, the results modal is shown*/

//----------------------------------//
//We want to be able to send data and  get the API to check JavaScript code for us.
//Firstly, a function to make the request. And secondly, a function to display the data.
//We are adding eventlistener at the very first part.....(10)

//After creating the function async function getStatus(e) we need to convert the  response to json and display it. (12)