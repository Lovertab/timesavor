console.log("Hello World");

function fetchTimedRecipes(time) {
  const apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=05e0e399&app_key=eac8bc585be359a5c08825b3eccf7a8f&time=30`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayTimedRecipes(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      weatherInfo.innerHTML = "<p>There was an error fetching recipes.</p>";
      forecast.innerHTML = "";
    });
}

function displayTimedRecipes() {}
