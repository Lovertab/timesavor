//.btn-primary
// Get the recipe container element
/*
const recipeContainer = document.getElementById("recipe-container");
console.log("HERE" + recipeContainer);
function createRecipeContainer(recipe) {
  // Create the container element
  const recipeContainerEl = document.createElement("div");
  recipeContainerEl.classList.add("recipe-container");
  // Create the recipe image element
  const recipeImg = document.createElement("img");
  recipeImg.classList.add("recipe-img");
  recipeImg.src = recipe.image;
  recipeContainerEl.appendChild(recipeImg);
  // Create the recipe name element
  const recipeName = document.createElement("h2");
  recipeName.classList.add("recipe-name");
  recipeName.innerText = recipe.label;
  recipeContainerEl.appendChild(recipeName);
  // Create the recipe ingredients element
  const recipeIngredients = document.createElement("ul");
  recipeIngredients.classList.add("recipe-ingredients");
  recipe.ingredients.forEach((ingredient) => {
    const ingredientItem = document.createElement("li");
    ingredientItem.innerText = ingredient.text;
    recipeIngredients.appendChild(ingredientItem);
  });
  recipeContainerEl.appendChild(recipeIngredients);
  // Create the recipe instructions element
  const recipeInstructions = document.createElement("a");
  recipeInstructions.classList.add("recipe-instructions");
  recipeInstructions.href = recipe.url;
  recipeInstructions.innerText = "View Recipe Instructions";
  recipeContainerEl.appendChild(recipeInstructions);
  // Return the container element
  return recipeContainerEl;
}

document.addEventListener("DOMContentLoaded", function () {
  const urlParameters = new URLSearchParams(window.location.search);
  const recipeParam = urlParameters.get("recipe");

  if (recipeParam) {
    const recipe = JSON.parse(recipeParam);
    const recipeContainer = createRecipeContainer(recipe);
    const recipeContainerDiv = document.getElementById("recipe-container");
    recipeContainerDiv.appendChild(recipeContainer);
  } else {
    console.error("Recipe data not found");
  }
});
*/

document.addEventListener("DOMContentLoaded", function () {
  const recipeData = sessionStorage.getItem("recipeData");

  if (recipeData) {
    const recipe = JSON.parse(recipeData);
    const recipeContainer = createRecipeContainer(recipe);
    const recipeContainerDiv = document.getElementById("recipe-container");
    recipeContainerDiv.appendChild(recipeContainer);
    sessionStorage.removeItem("recipeData"); // Remove the recipe data from session storage after use
  } else {
    console.error("Recipe data not found");
  }
});

function createRecipeContainer(recipe) {
  // Create the container element
  const recipeContainerEl = document.createElement("div");
  recipeContainerEl.classList.add("recipe-container", "container");

  // Create the row
  const row = document.createElement("div");
  row.classList.add("row");
  recipeContainerEl.appendChild(row);

  // Create the left column
  const leftCol = document.createElement("div");
  leftCol.classList.add("col-md-8");
  row.appendChild(leftCol);

  // Create the recipe name element
  const recipeName = document.createElement("h2");
  recipeName.classList.add("recipe-name");
  recipeName.innerText = recipe.label;
  recipeName.style.borderBottom = "2px solid #000";
  recipeName.style.paddingBottom = "10px";
  leftCol.appendChild(recipeName);

  // Create the recipe ingredients element
  const recipeIngredients = document.createElement("ul");
  recipeIngredients.classList.add("recipe-ingredients");
  recipe.ingredients.forEach((ingredient) => {
    const ingredientItem = document.createElement("li");
    ingredientItem.innerText = ingredient.text;
    recipeIngredients.appendChild(ingredientItem);
  });
  leftCol.appendChild(recipeIngredients);

  // Create the recipe instructions element
  const recipeInstructions = document.createElement("a");
  recipeInstructions.classList.add("recipe-instructions", "btn", "btn-primary");
  recipeInstructions.href = recipe.url;
  recipeInstructions.innerText = "View Recipe Instructions";
  leftCol.appendChild(recipeInstructions);

  // Create the right column
  const rightCol = document.createElement("div");
  rightCol.classList.add("col-md-4");
  row.appendChild(rightCol);

  // Create the recipe image element
  const recipeImg = document.createElement("img");
  recipeImg.classList.add("recipe-img");
  recipeImg.src = recipe.image;
  recipeImg.style.maxWidth = "100%";
  recipeImg.style.height = "auto";
  rightCol.appendChild(recipeImg);

  // Return the container element
  return recipeContainerEl;
}
