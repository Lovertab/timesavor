// Recipe API Functions

///API Key
// const appID = "05e0e399";
// const appKey = "eac8bc585be359a5c08825b3eccf7a8f";
const appID = "9cc2ffbd";
const appKey = "bc7e8bed88a44f384eb61221adb181ed";

/// DOM element references
const mealType = localStorage.getItem("mealType");
const cuisineType = localStorage.getItem("cuisineType");
const dishType = localStorage.getItem("dishType");
const excluded = localStorage.getItem("excludeOption");
const time = localStorage.getItem("timeDuration");

fetchTimedRecipes();

// Function to fetch recipes based on user preferences
function fetchTimedRecipes() {
  const apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appID}&app_key=${appKey}&cuisineType=${cuisineType}&mealType=${mealType}&dishType=${dishType}&time=${time}&excluded=${excluded}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      createRecipeCards(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Function to display timed recipes
function displayTimedRecipes(data) {
  // Extract recipe data from the API response
  const recipe = data.hits[0].recipe;
  const time = recipe.totalTime;
  const cuisineType = recipe.cuisineType[0];
  const dishType = recipe.dishType[0];
  // Create a recipe card element
  const card = document.createElement("div");

  card.classList.add("recipe-card");
  //Create elements to display recipe information
  const mealElement = document.createElement("p");
  const cuisineElement = document.createElement("p");
  const dishElement = document.createElement("p");
  const excludedElement = document.createElement("p");
  const timeElement = document.createElement("p");
  // Set text content for each element
  mealElement.textContent = `Meal Type: ${mealType}`;
  cuisineElement.textContent = `Cuisine: ${cuisineType}`;
  dishElement.textContent = `Dish Type: ${dishType}`;
  excludedElement.textContent = `Excluded: ${excluded}`;
  timeElement.textContent = `Time: ${time.toLocaleTimeString()}`;
  // Append elements to the card
  card.appendChild(mealElement);
  card.appendChild(cuisineElement);
  card.appendChild(dishElement);
  card.appendChild(excludedElement);
  card.appendChild(timeElement);
  // Append the card to the recipe cards container
  const container = document.getElementById("recipe-cards-container");
  container.appendChild(card);
  console.log(time);
  console.log(excluded);
  console.log(mealType);
  console.log(cuisineType);
  console.log(dishType);
}

// Function to create recipe cards based on fetched data
function createRecipeCards(data) {
  // Get the container for recipe cards
  const container = document.getElementById("recipe-cards-container");
  // Check if the container exists
  if (!container) {
    console.error(
      "Container element with ID 'recipe-cards-container' not found"
    );
    return;
  }
  // Clear the container
  container.innerHTML = "";
  // Hit over each recipe in the fetched data
  data.hits.forEach((hit) => {
    const recipe = hit.recipe;
    // Extract recipe ID from the URI
    const recipeId = hit.recipe.uri.split("#recipe_")[1];
    console.log(recipeId);

    const card = document.createElement("div");
    card.classList.add("col", "col-6", "col-xl-4", "card", "mb-4");
    // Store the recipe ID in the card element for access when clicked
    card.setAttribute("data-recipe-id", recipeId);

    const img = document.createElement("img");
    img.src = recipe.image;
    img.classList.add("card-img-top");
    img.alt = "Recipe Image";
    card.appendChild(img);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    card.appendChild(cardBody);

    const cardInfo = document.createElement("div");
    cardInfo.classList.add("card-info");
    cardBody.appendChild(cardInfo);

    const title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = recipe.label;
    cardBody.appendChild(title);

    const description = document.createElement("p");
    description.classList.add("card-text");
    description.textContent =
      recipe.dietLabels.join(", ") || "Delicious recipe";
    cardBody.appendChild(description);

    const viewBtn = document.createElement("a");

    viewBtn.classList.add("btn", "btn-primary", "view-recipe-btn"); // Added 'view-recipe-btn' class
    //viewBtn.href = recipe.url;

    viewBtn.textContent = "View Recipe";
    cardBody.appendChild(viewBtn);
    //added button even listener here

    viewBtn.addEventListener("click", function () {
      sessionStorage.setItem("recipeData", JSON.stringify(recipe));
      window.location.href = "recipedetails.html";
    });

    card.addEventListener("click", function () {
      const clickedRecipeId = this.getAttribute("data-recipe-id");
      console.log("Clicked Recipe ID:", clickedRecipeId); // This will now only log when a card is clicked
    });

    container.appendChild(card);
  });
}

// Theme Switcher
const toggleTheme = document.getElementById(`toggle-mode`);
const body = document.body;
toggleTheme.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  body.classList.toggle("light-mode");

  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});
// Check for theme in localStorage and apply it
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark-mode");
} else {
  body.classList.add("light-mode");
}

//GRABS FORM DATA FROM LOCAL STORAGE
document.getElementById("formID").addEventListener("submit", function (event) {
  event.preventDefault();
  const mealType = document.getElementById("mealType").value;
  localStorage.setItem("mealType", mealType);

  const cuisineType = document.getElementById("cuisineSelect").value;
  localStorage.setItem("cuisineType", cuisineType);

  const dishType = document.getElementById("dishType").value;
  localStorage.setItem("dishType", dishType);

  const excluded = document.getElementById("excludeOption").value;
  localStorage.setItem("excludeOption", excluded);

  const time = document.getElementById("timeDuration").value;
  localStorage.setItem("timeDuration", time);

  window.location.href = "recipecards.html";
});

const image = document.getElementById("animatedPic");
const tl = gsap.timeline();
tl.fromTo(
  image,
  { y: 20, opacity: 0 },
  { duration: 1, y: 0, opacity: 1, ease: "power2.inOut" }
);
