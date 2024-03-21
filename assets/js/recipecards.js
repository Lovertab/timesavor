// Define a function named setFormValues to initialize form fields with values from localStorage.
function setFormValues() {
  console.log("Setting form values from localStorage..."); // Log a message to the console indicating the beginning of setting form values from localStorage.

  // Retrieve various types of information from localStorage and store them in respective constants.
  const storedMealType = localStorage.getItem("mealType");
  const storedCuisineType = localStorage.getItem("cuisineType");
  const storedDishType = localStorage.getItem("dishType");
  const storedExcluded = localStorage.getItem("excludeOption");
  const storedTime = localStorage.getItem("timeDuration");

  // Log the retrieved values for debugging purposes, showing them grouped in an object.
  console.log("Retrieved Values:", {
    storedMealType,
    storedCuisineType,
    storedDishType,
    storedExcluded,
    storedTime,
  });

  // Set the form fields with the retrieved values if they exist.
  if (storedMealType)
    document.getElementById("mealType").value = storedMealType;
  if (storedCuisineType)
    document.getElementById("cuisineSelect").value = storedCuisineType;
  if (storedDishType)
    document.getElementById("dishType").value = storedDishType;
  if (storedExcluded)
    document.getElementById("excludeOption").value = storedExcluded;
  if (storedTime) document.getElementById("timeDuration").value = storedTime;
}

const url = window.location.href.split("/").at(-1);
if (url === "recipecards.html") {
  setFormValues();
}
