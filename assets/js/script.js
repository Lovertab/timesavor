///API Key
const appID = "05e0e399";
const appKey = "eac8bc585be359a5c08825b3eccf7a8f";
/// DOM element references
// const cuisineType = document.getElementById("cuisineSelect");
// const mealType = document.getElementById("mealType");
// const dishType = document.getElementById("dishType");
// const time = document.getElementById("timeDuration");
// const excluded = document.getElementById("excludeOption");

console.log("Hello World");

const cuisineType = "American";
const mealType = "Lunch";
const dishType = "Sandwiches";
const time = "20";
const excluded = "gluten";

fetchTimedRecipes();

function fetchTimedRecipes() {
  const apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appID}&app_key=${appKey}&cuisineType=${cuisineType}&mealType=${mealType}&dishType=${dishType}&time=${time}&excluded=${excluded}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // displayTimedRecipes(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      weatherInfo.innerHTML = "<p>There was an error fetching recipes.</p>";
      forecast.innerHTML = "";
    });
}

function displayTimedRecipes(data) {
  // Assuming the response is stored in a variable called 'data'
  const recipe = data.hits[0].recipe; // Get the first recipe object

  // Extract the desired information
  const time = recipe.totalTime;
  const cuisineType = recipe.cuisineType[0];
  const dishType = recipe.dishType[0];

  // Create the card element
  const card = document.createElement("div");
  card.classList.add("recipe-card"); // Add a CSS class for styling

  // Create elements for each piece of information
  const timeElement = document.createElement("p");
  const cuisineElement = document.createElement("p");
  const dishElement = document.createElement("p");

  // Set the content of the elements
  timeElement.textContent = `Time: ${time.toLocaleTimeString()}`;
  cuisineElement.textContent = `Cuisine: ${cuisineType}`;
  dishElement.textContent = `Dish Type: ${dishType}`;

  // Add the elements to the card
  card.appendChild(timeElement);
  card.appendChild(cuisineElement);
  card.appendChild(dishElement);

  // Append the card to the desired container in your HTML --REPLACE WITH CONTAINER ID--
  const container = document.getElementById("recipe-container");
  container.appendChild(card);
  console.log(time);
  console.log(cuisineType);
  console.log(dishType);
}
