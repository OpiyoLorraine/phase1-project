// Get references to HTML elements
let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let url = "https://thecocktaildb.com/api/json/v1/1/search.php?s=";

// Function to handle the search operation
let getInfo = () => {
  // Get the user input
  let userInp = document.getElementById("user-inp").value;
  
  // Check if the input is empty
  if (userInp.length == 0) {
    // Display error message if input is empty
    result.innerHTML = `<h3 class="msg">The input field cannot be empty</h3>`;
  } else {
    // Fetch data from the API based on user input
    fetch(url + userInp)
      .then((response) => response.json())
      .then((data) => {
        // Clear previous search results
        result.innerHTML = "";
        
        // Iterate over each drink in the data
        data.drinks.forEach((drink) => {
          // Create container for each drink
          let drinkContainer = document.createElement("div");
          drinkContainer.classList.add("drink-container");
          
          // Create delete button for each drink
          let deleteBtn = document.createElement("button");
          deleteBtn.innerText = "Delete";
          deleteBtn.classList.add("delete-btn");
          
          // Create image element for the drink
          let drinkImage = document.createElement("img");
          drinkImage.src = drink.strDrinkThumb;
          drinkImage.classList.add("drink-image");
          
          // Create heading element for the drink name
          let drinkName = document.createElement("h2");
          drinkName.innerText = drink.strDrink;
          drinkName.classList.add("drink-name");
          
          // Create unordered list for ingredients
          let ingredientsList = document.createElement("ul");
          ingredientsList.classList.add("ingredients-list");
          
          // Loop through the ingredients and measurements
          for (let i = 1; i <= 15; i++) {
            let ingredient = drink["strIngredient" + i];
            let measurement = drink["strMeasure" + i];

            // Check if both ingredient and measurement exist
            if (ingredient && measurement) {
              // Create list item for each ingredient
              let ingredientItem = document.createElement("li");
              ingredientItem.innerText = `${measurement} ${ingredient}`;
              ingredientsList.appendChild(ingredientItem);
            }
          }
          
          // Create paragraph element for instructions
          let instructions = document.createElement("p");
          instructions.innerText = drink.strInstructions;
          instructions.classList.add("instructions");
          
          // Append all elements to the drink container
          drinkContainer.appendChild(deleteBtn);
          drinkContainer.appendChild(drinkImage);
          drinkContainer.appendChild(drinkName);
          drinkContainer.appendChild(ingredientsList);
          drinkContainer.appendChild(instructions);
          
          // Append drink container to the result section
          result.appendChild(drinkContainer);
          
          // Event listener for delete button
          deleteBtn.addEventListener("click", () => {
            drinkContainer.remove(); // Remove the drink container when delete button is clicked
          });
        });
      })
      .catch(() => {
        // Display error message if there is an error with the API request
        result.innerHTML = `<h3 class="msg">Please enter a valid input</h3>`;
      });
  }
};

// Call getInfo function when the window loads
window.addEventListener("load", getInfo);

// Call getInfo function when search button is clicked
searchBtn.addEventListener("click", getInfo);
