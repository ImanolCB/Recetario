const API_KEY = '9bd0987a504c44a0b35121a17500736c';
const BASE_URL = 'https://api.spoonacular.com';

// Function to fetch recipe by ID
async function getRecipeById(recipeId) {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/${recipeId}/information`, {
      params: { apiKey: API_KEY }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return null;
  }
}

// Function to search recipes by query
async function searchRecipes(query) {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/complexSearch`, {
      params: { apiKey: API_KEY, query: query }
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching recipes:', error);
    return [];
  }
}

// Function to render a recipe
function renderRecipe(recipe) {
  const recipeDiv = document.getElementById('recipe');
  if (recipe) {
    recipeDiv.innerHTML = `
      <div class="card recipe-card">
        <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
        <div class="card-body">
          <h5 class="card-title">${recipe.title}</h5>
          <p class="card-text"><strong>Ready in:</strong> ${recipe.readyInMinutes} minutes</p>
          <p class="card-text"><strong>Servings:</strong> ${recipe.servings}</p>
        </div>
      </div>
    `;
  } else {
    recipeDiv.innerHTML = '<p class="text-danger">Failed to fetch recipe.</p>';
  }
}

// Function to render search results
function renderSearchResults(recipes) {
  const resultsDiv = document.getElementById('search-results');
  resultsDiv.innerHTML = '<h3>Search Results:</h3>';
  if (recipes.length > 0) {
    recipes.forEach(recipe => {
      resultsDiv.innerHTML += `
        <div class="card recipe-card">
          <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
          <div class="card-body">
            <h5 class="card-title">${recipe.title}</h5>
          </div>
        </div>
      `;
    });
  } else {
    resultsDiv.innerHTML += '<p class="text-danger">No recipes found.</p>';
  }
}

// Main function to fetch and display data
(async function main() {
  // const recipe = await getRecipeById(715538); // Fetch a recipe by ID
  // renderRecipe(recipe);

  const recipes = await searchRecipes('carne'); // Search for recipes
  console.log(recipes)
  renderSearchResults(recipes);
})();
