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
      createRecipeCards(data); // Add this line to call your new function
    })
    .catch((error) => {
      console.error("Error:", error);
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

  // Append the card to the desired container in your HTML
  const container = document.getElementById("recipe-cards-container");
  container.appendChild(card);
  console.log(time);
  console.log(cuisineType);
  console.log(dishType);
}
function createRecipeCards(data) {
  const container = document.getElementById("recipe-cards-container");
  container.innerHTML = ""; // Clear out existing content

  data.hits.forEach((hit) => {
    const recipe = hit.recipe;

    // Create the card element and still need to add some Bootstrap classes for styling
    const card = document.createElement("div");
    card.classList.add("col", "col-md-6", "col-lg-4", "card", "mb-4");

    // Create and append the image element
    const img = document.createElement("img");
    img.src = recipe.image;
    img.classList.add("card-img-top");
    img.alt = "Recipe Image";
    card.appendChild(img);

    // Create the card body
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    card.appendChild(cardBody);

    // Set the title
    const title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = recipe.label;
    cardBody.appendChild(title);

    // Set the description or any other information you want to include
    const description = document.createElement("p");
    description.classList.add("card-text");
    description.textContent =
      recipe.dietLabels.join(", ") || "Delicious recipe";
    cardBody.appendChild(description);

    // Add a button or link to view the full recipe
    const viewBtn = document.createElement("a");
    viewBtn.classList.add("btn", "btn-primary");
    viewBtn.href = recipe.url;
    viewBtn.textContent = "View Recipe";
    cardBody.appendChild(viewBtn);

    // Append the card to the designated container in your HTML
    container.appendChild(card);
  });
}

console.log("Hello World");
const toggleTheme = document.getElementById(`toggle-mode`);
const body = document.body;

toggleTheme.addEventListener('click', () => {
    body.classList.toggle(`dark-mode`);
    body.classList.toggle(`light-mode`);
});
