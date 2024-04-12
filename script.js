let result = document.getElementById("result");

let searchBtn = document.getElementById("search-btn");

let url ="https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

let userInput = document.getElementById("user-input").value;

if(userInput.length == 0){
   result.innerHTML =`<h3 class="msg">The input field cannot be empty</h3>`; 
}
else{
  fetch(url + userInput)
  .then (response => response.json())
  .then(data =>{
    console.log(data);
  }); 
}