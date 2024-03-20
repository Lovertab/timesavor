// Recipe API Functions

///API Key
const appID = "05e0e399";
const appKey = "eac8bc585be359a5c08825b3eccf7a8f";

/// DOM element references
// const cuisineType = document.getElementById("cuisineSelect");
// const mealType = document.getElementById("mealType");
// const dishType = document.getElementById("dishType");
// const time = document.getElementById("timeDuration");
// const excluded = document.getElementById("excludeOption");
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
      createRecipeCards(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function displayTimedRecipes(data) {
  const recipe = data.hits[0].recipe;

  // Extract the desired information
  const time = recipe.totalTime;
  const cuisineType = recipe.cuisineType[0];
  const dishType = recipe.dishType[0];

  const card = document.createElement("div");
  card.classList.add("recipe-card");

  const timeElement = document.createElement("p");
  const cuisineElement = document.createElement("p");
  const dishElement = document.createElement("p");

  timeElement.textContent = `Time: ${time.toLocaleTimeString()}`;
  cuisineElement.textContent = `Cuisine: ${cuisineType}`;
  dishElement.textContent = `Dish Type: ${dishType}`;

  card.appendChild(timeElement);
  card.appendChild(cuisineElement);
  card.appendChild(dishElement);

  const container = document.getElementById("recipe-cards-container");
  container.appendChild(card);
  console.log(time);
  console.log(cuisineType);
  console.log(dishType);
}

function createRecipeCards(data) {
  const container = document.getElementById("recipe-cards-container");
  container.innerHTML = "";

  data.hits.forEach((hit) => {
    const recipe = hit.recipe;

    const card = document.createElement("div");
    card.classList.add("col", "col-md-6", "col-lg-4", "card", "mb-4");

    const img = document.createElement("img");
    img.src = recipe.image;
    img.classList.add("card-img-top");
    img.alt = "Recipe Image";
    card.appendChild(img);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    card.appendChild(cardBody);

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
    viewBtn.classList.add("btn", "btn-primary");
    viewBtn.href = recipe.url;
    viewBtn.textContent = "View Recipe";
    cardBody.appendChild(viewBtn);

    container.appendChild(card);
  });
}

// Theme Switcher
const toggleTheme = document.getElementById(`toggle-mode`);
const body = document.body;

toggleTheme.addEventListener("click", () => {
  body.classList.toggle(`dark-mode`);
  body.classList.toggle(`light-mode`);
});

// Youtube API Functions

const API_KEY = "AIzaSyB6MgbqljzSbiDedQkLjTe6CXU6jE0TVDA";

query = "chicken sandwich" + " recipe";

async function searchYouTube(query) {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&type=video&part=snippet&maxResults=1&q=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data.items[0];
}

function displayVideo(videoData) {
  const videoContainer = document.getElementById("video-container");
  const videoEmbed = `
    <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoData.id.videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <h2>${videoData.snippet.title}</h2>
    <p>${videoData.snippet.description}</p>
  `;
  videoContainer.innerHTML = videoEmbed;
}

searchYouTube(query)
  .then(displayVideo)
  .catch((error) => console.error("Error searching YouTube:", error));
