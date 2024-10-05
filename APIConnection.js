//Given an ingredient, call the api with that ingredient
async function CallAPI(ingredient) {

    const apiUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + ingredient;
    let returnValue = "Error";

    //Call API
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) { //Response not ok
            console.error('Network response was not ok');
        } else { //Response good!
            returnValue = await response.json();
        }
    } catch (error) { //Error
        console.error('Error:', error);
    }

    return returnValue;
}
