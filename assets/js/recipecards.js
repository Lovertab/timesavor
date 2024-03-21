function setFormValues() {
  console.log("Setting form values from localStorage...");

  const storedMealType = localStorage.getItem("mealType");
  const storedCuisineType = localStorage.getItem("cuisineType");
  const storedDishType = localStorage.getItem("dishType");
  const storedExcluded = localStorage.getItem("excludeOption");
  const storedTime = localStorage.getItem("timeDuration");

  console.log("Retrieved Values:", {
    storedMealType,
    storedCuisineType,
    storedDishType,
    storedExcluded,
    storedTime,
  });

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
