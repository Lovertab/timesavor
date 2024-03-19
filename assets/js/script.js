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

fetchTimedRecipes();

function displayTimedRecipes() {
  const { hits } = data.list[0];
  const { dishType, mealType, time, cuisineType, excluded } = recipe[0];
}
