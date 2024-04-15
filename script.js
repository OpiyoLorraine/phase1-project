let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let url = "https://thecocktaildb.com/api/json/v1/1/search.php?s=";

let getInfo = () => {
  let userInp = document.getElementById("user-inp").value;
  if (userInp.length == 0) {
    result.innerHTML = `<h3 class="msg">The input field cannot be empty</h3>`;
  } else {
    fetch(url + userInp)
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("user-inp").value = "";
        console.log(data);
        result.innerHTML = ""; // Clear previous search results
        data.drinks.forEach((drink) => {
          let drinkContainer = document.createElement("div");
          drinkContainer.classList.add("drink-container");

          let deleteBtn = document.createElement("button");
          deleteBtn.innerText = "Delete";
          deleteBtn.classList.add("delete-btn");

          let drinkImage = document.createElement("img");
          drinkImage.src = drink.strDrinkThumb;
          drinkImage.classList.add("drink-image");

          let drinkName = document.createElement("h2");
          drinkName.innerText = drink.strDrink;
          drinkName.classList.add("drink-name");

          let ingredientsList = document.createElement("ul");
          ingredientsList.classList.add("ingredients-list");

          for (let i = 1; i <= 15; i++) {
            let ingredient = drink["strIngredient" + i];
            let measurement = drink["strMeasure" + i];

            if (ingredient && measurement) {
              let ingredientItem = document.createElement("li");
              ingredientItem.innerText = `${measurement} ${ingredient}`;
              ingredientsList.appendChild(ingredientItem);
            }
          }

          let instructions = document.createElement("p");
          instructions.innerText = drink.strInstructions;
          instructions.classList.add("instructions");

          drinkContainer.appendChild(deleteBtn);
          drinkContainer.appendChild(drinkImage);
          drinkContainer.appendChild(drinkName);
          drinkContainer.appendChild(ingredientsList);
          drinkContainer.appendChild(instructions);

          result.appendChild(drinkContainer);

          deleteBtn.addEventListener("click", () => {
            drinkContainer.remove();
          });
        });
      })
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Please enter a valid input</h3>`;
      });
  }
};

window.addEventListener("load", getInfo);
searchBtn.addEventListener("click", getInfo);
