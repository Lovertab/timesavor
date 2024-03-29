// Event listener to execute when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Retrieve recipe data from session storage
  const recipeData = sessionStorage.getItem("recipeData");

  // Check if recipe data exists
  if (recipeData) {
    const recipe = JSON.parse(recipeData);
    // Get the recipe container element
    const recipeContainerDiv = document.getElementById("recipe-container");
    // Create the recipe container
    const recipeContainer = createRecipeContainer(recipe);
    recipeContainerDiv.appendChild(recipeContainer);
    // Remove the recipe data from session storage after use
    sessionStorage.removeItem("recipeData");
  } else {
    console.error("Recipe data not found");
  }
});

// Function to create a recipe container element
function createRecipeContainer(recipe) {
  // Create the container element
  const recipeContainerEl = document.createElement("div");
  recipeContainerEl.classList.add("recipe-container", "container", "mt-5");

  // Create the row
  const row = document.createElement("div");
  row.classList.add("row");
  recipeContainerEl.appendChild(row);

  // Create the left column
  const leftCol = document.createElement("div");
  leftCol.classList.add("col-md-8");
  row.appendChild(leftCol);

  // Create the recipe title element
  const recipeName = document.createElement("h2");
  recipeName.classList.add("recipe-name");
  recipeName.innerText = recipe.label;
  leftCol.appendChild(recipeName);

  // Create the cooking time element
  const cookingTime = document.createElement("p");
  cookingTime.classList.add("cooking-time");
  cookingTime.innerText = `Total Cooking Time: ${recipe.totalTime} minutes`;
  leftCol.appendChild(cookingTime);

  // Create the recipe ingredients element
  const recipeIngredients = document.createElement("ul");
  recipeIngredients.classList.add("recipe-ingredients", "mt-3"); // Add mt-3 class for top margin
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
  recipeInstructions.target = "_blank";
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

  // Create the video section
  const videoSection = document.createElement("div");
  videoSection.classList.add("mt-5");

  // Create the section heading
  const sectionHeading = document.createElement("h3");
  sectionHeading.textContent = "See instructions for similar meal";
  sectionHeading.style.borderBottom = "2px solid #000";
  sectionHeading.style.paddingBottom = "10px";
  videoSection.appendChild(sectionHeading);

  // Create the video container
  const videoContainer = document.createElement("div");
  videoContainer.id = "video-container";
  videoSection.appendChild(videoContainer);

  // Append the video section to the container
  recipeContainerEl.appendChild(videoSection);

  // Call the searchYouTube function with the recipe label as the query
  searchYouTube(recipe.label)
    .then((videoData) => displayVideo(videoData, videoContainer))
    .catch((error) => console.error("Error searching YouTube:", error));

  // Return the container element
  return recipeContainerEl;
}

const API_KEY = "AIzaSyA1ksDknP34z9z3scJYhzs4RlXoree05-w";

// Function to search for videos related to the recipe on YouTube
async function searchYouTube(query) {
  console.log("Sending request to YouTube API...");
  // Fetch data from YouTube API
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&type=video&part=snippet&maxResults=1&q=${encodeURIComponent(
      query
    )}`
  );
  // Check if response is successful
  if (!response.ok) {
    console.error("Error fetching data from YouTube API:", response.status);
    return;
  }

  console.log("Response received from YouTube API");
  const data = await response.json();
  if (data.items.length === 0) {
    console.log("No results found for the given query");
    return;
  }
  return data.items[0];
}

// Function to display the video in the video container
function displayVideo(videoData, videoContainer) {
  // Check if video data and snippet exist
  if (videoData && videoData.id && videoData.id.videoId && videoData.snippet) {
    // Construct HTML for embedding video
    const videoEmbed = `
      <div class="video-container">
        <iframe class="video-iframe" src="https://www.youtube.com/embed/${videoData.id.videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <h2>${videoData.snippet.title}</h2>
      <p>${videoData.snippet.description}</p>
    `;
    // Set the inner HTML of the video container to the video embed HTML
    videoContainer.innerHTML = videoEmbed;
  } else {
    // Display error message if video data is incomplete
    videoContainer.innerHTML = "<p>Unable to load video for this recipe.</p>";
  }
}
