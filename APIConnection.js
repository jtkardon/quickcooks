/*async function CallAPI(ingredient) {
    console.log("start");

    let apiCallDone = false;
    const apiUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + ingredient;
    const apiKey = "1";
    let returnValue = "Error";


    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            returnValue = data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    return returnValue;
}*/

async function CallAPI(ingredient) {
    console.log("start");

    const apiUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + ingredient;
    let returnValue = "Error";

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        returnValue= await response.json();
    } catch (error) {
        console.error('Error:', error);
    }

    return returnValue;
}
