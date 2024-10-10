let foodList = []



function addFood (event){
    event.preventDefault();
    console.log('YES')

    const foodItem = document.querySelector('#newIngredient').value;
    console.log('Yes again')
    if (foodItem) {
        console.log('HERE')
        foodList.push(foodItem);
        const finalList = document.getElementById('ingredient-list');
        const listItem = document.createElement('li');
        listItem.textContent = foodItem;
        finalList.appendChild(listItem);
        console.log('HERE2')
        const remButton = document.createElement('BUTTON');
        console.log('HERE3')
        remButton.onclick = removeFood(this);
        remButton.textContent = "Remove";
        listItem.append(remButton)
        console.log('HERE4')
    }
    updateRecipes()
}

function removeFood(elem) {
    console.log('NO')

    console.log(elem)
    clicked.parentNode.remove()

    updateRecipes()
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