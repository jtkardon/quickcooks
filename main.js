let foodList = []



function addFood (event){
    event.preventDefault();
    console.log('YES')

    const foodItem = document.querySelector('#newIngredient').value;
    if (foodItem) {
        foodList.push(foodItem);
        const finalList = document.getElementById('ingredient-list');
        const listItem = document.createElement('li');
        listItem.textContent = foodItem;
        finalList.appendChild(listItem);
        listItem.addEventListener('click', removeFood, false)
    }
    updateRecipes()
}

function removeFood(event) {

    console.log('removing');
    console.log(event.target);

    const food = event.target.textContent;
    foodList.splice(foodList.indexOf(food), 1);

    // removes food item
    event.target.remove();

    updateRecipes();
}

async function updateRecipes(){
    recipes = []
    for (const ingredient of foodList) {
        try {
            const list = await CallAPI(ingredient)
            if (list.meals) {
                list.meals.forEach(l => {
                    recipes.push(l)
                    console.log(l)
                });
            } else {
                console.error('No meals found for ingredient:', ingredient);
            }
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    }

    const recipeList = document.getElementById('recipe-list');
    while(recipeList.firstChild) {
        recipeList.removeChild(recipeList.firstChild)
    }
    recipes.forEach(r => {
        
        const listItem = document.createElement('li');
        const link = document.createElement('a');

        const image = document.createElement('img');
        image.src = r.strMealThumb
        //image.alt = recipe.strMeal
        image.style.width = '50px'
        image.style.height = '50px'
        image.style.objectFit = 'cover'

        link.textContent = r.strMeal
        link.href = `https://www.themealdb.com/meal/${r.idMeal}`
        link.target = '_blank'
        listItem.appendChild(image);
        listItem.appendChild(link)
        recipeList.appendChild(listItem)
    })
}

window.onload = function() {
    const addButton = document.querySelector('#submit')

    if (addButton) {
        addButton.onclick = (event) => addFood(event);
    }
}