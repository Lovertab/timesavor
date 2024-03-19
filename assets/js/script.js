console.log("Hello World");

const cuisineType = "American";
const mealType = "Lunch";
const dishType = "Sandwiches";
const time = "20";
const excluded = "gluten";

function fetchTimedRecipes() {
  const apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=05e0e399&app_key=eac8bc585be359a5c08825b3eccf7a8f&cuisineType=${cuisineType}&mealType=${mealType}&dishType=${dishType}&time=${time}&excluded=${excluded}`;

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

function displayTimedRecipes() {}
