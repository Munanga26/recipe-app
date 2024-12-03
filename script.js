const btn = document.querySelector(".btn");
const searchBar = document.querySelector(".search-bar");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeButton = document.querySelector(".recipe-btn");
const recipeDetail = document.querySelector(".recipe-details");

//collection data from the api using a method called fetch
const fetchRecipes = async (query) => {
  recipeContainer.innerHTML = "<h2>Recipes loading 3 2 1...</h2>";
  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  const response = await data.json();

  recipeContainer.innerHTML = "";

  response.meals.forEach((meal) => {
    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("recipe");
    recipeDiv.innerHTML = `<img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p> <span>${meal.strArea}</span>Dish</p>
        <p> <span>${meal.strCategory}<span> Category</p>
        `;
    const button = document.createElement("button");
    button.textContent = "View Recipe";
    recipeDiv.appendChild(button);

    //giving a function to the recipe button
    button.addEventListener("click", () => {
      openRecipePopup(meal);
    });

    recipeContainer.appendChild(recipeDiv);
  });
};
const fetchIngredients = (meal) => {
  let IngredientsList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      const measure = meal[`strMeasure${i}`];
      IngredientsList += `<li>${measure} ${ingredient}</li>`;
    } 
    else{
      break;
    }
  }
  return IngredientsList;
};
const openRecipePopup = (meal) => {
  recipeDetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="ingredientsList"> ${fetchIngredients(meal)}</ul>
    <div>
            <h3>Instructions:</h3>
            <p class="RepInstructions">${meal.strInstructions}</p>
    </div>
    `;
  recipeDetailsContent.parentElement.style.display = "block";
};
recipeButton.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display ="none"

});
btn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = searchBar.value.trim();
  fetchRecipes(searchInput);
  //console.log("Button clicked")
});
