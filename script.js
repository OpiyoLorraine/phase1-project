// Function to fetch data from the API
async function fetchData() {
    try {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita');
      const data = await response.json();
      return data.drinks;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }
  
  // Function to display data
  function displayData(drinks) {
    const container = document.getElementById('data-container');
    container.innerHTML = '';
    drinks.forEach(drink => {
      const drinkElement = document.createElement('div');
      drinkElement.innerHTML = `<p>${drink.strDrink}</p>`;
      container.appendChild(drinkElement);
    });
  }
  
  // Function to add new data
  async function addData(newData) {
    try {
      const response = await fetch('API_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding data:', error);
      return null;
    }
  }
  
  // Function to delete data
  async function deleteData(id) {
    try {
      const response = await fetch(`API_URL/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting data:', error);
      return null;
    }
  }
  
  // Example usage:
  
  // Fetch and display data
  fetchData()
    .then(data => {
      displayData(data);
    })
    .catch(error => {
      console.error('Error fetching and displaying data:', error);
    });
  
  // Add new data
  const newData = {
    idDrink: '12345',
    strDrink: 'New Drink',
    // Add other properties as needed
  };
  addData(newData)
    .then(data => {
      console.log('New data added:', data);
    })
    .catch(error => {
      console.error('Error adding new data:', error);
    });
  
  // Delete data
  const drinkIdToDelete = '12345'; // Example ID to delete
  deleteData(drinkIdToDelete)
    .then(data => {
      console.log('Data deleted:', data);
    })
    .catch(error => {
      console.error('Error deleting data:', error);
    });
  