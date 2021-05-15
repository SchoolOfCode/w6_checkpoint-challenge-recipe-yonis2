
const getMealBtn = document.getElementById('get_meal')
const recipeCardContainer = document.querySelector('.recipe-card-container');


// list of dishes
const dishes = ['pasta', 'chicken', 'cake', 'rice', 'beef', 'fish'];


// API credentials
const YOUR_APP_ID = "361b72d1"
const YOUR_APP_KEY = "35435d2ed4c17c0f69a5320a42fef666"


// we want to have a button, that when clicked returns a page of recipes

getMealBtn.addEventListener("click", getRecipe)

// connect button to generate random recipes

async function getRecipe() {
    const dishName = generateRandomDish()
    const requestUrl = `https://api.edamam.com/search?q=${dishName}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`
    const requestRecipe = await fetch(requestUrl);
    const response = await requestRecipe.json();

    // list of returned recipes
    const recipes = response.hits;
    //console.log(recipes)

    // clear recipe-card-container before adding new recipes
    recipeCardContainer.innerHTML = '';

    //loop through the recipes and render it
    recipes.forEach(function(recipes) {
        generateRecipeCard(recipes.recipe);
    })
    
}


// create a recipe card and render it
function generateRecipeCard(recipe) {
    const recipeCard = `
        <div class="recipe-card">
            <img src=${recipe.image} alt="recipe image">
            <h4 class="title">${recipe.label}</h4>
            <p class="cal">Calories: ${recipe.calories.toFixed(0)}</p>
        </div>`

    recipeCardContainer.insertAdjacentHTML('afterbegin', recipeCard)
}


// 
function generateRandomDish() {
    // generate a random number (index)
    const randomDishIndex = Math.floor(Math.random()*dishes.length);
    //console.log(randomDishIndex)
    const dishName = dishes[randomDishIndex];
    return dishName
}