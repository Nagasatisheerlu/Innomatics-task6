const app_id = '179f0cf2';
const app_key = '35fc9bcf2ed4497405b60485ad5da6f6';

const resultContainer = document.getElementById('record-display');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('input-text');

// Event listener for search form submission
searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    searchRecipes();
});

// Fetch initial recipes to display
document.addEventListener('DOMContentLoaded', fetchInitialRecipes);

function fetchInitialRecipes() {
    const apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=icecream&app_id=${app_id}&app_key=${app_key}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayRecipes(data.hits))
        .catch(error => showError('Error fetching recipes. Please try again later.'));
}

function searchRecipes() {
    const query = searchInput.value.trim();
    if (!query) {
        showError('Please enter a recipe name.');
        return;
    }

    const apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(query)}&app_id=${app_id}&app_key=${app_key}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayRecipes(data.hits))
        .catch(error => showError('Error fetching recipes. Please try again later.'));
}

function displayRecipes(recipes) {
    resultContainer.innerHTML = '';
    const row = document.createElement('div');
    row.classList.add('row', 'g-4');

    if (recipes.length === 0) {
        showError('No recipes found for this search.');
        return;
    }

    recipes.forEach(hit => {
        const recipe = hit.recipe;
        const card = document.createElement('div');
        card.classList.add('col-md-4');

        card.innerHTML = `
            <div class="card recipe-card h-100">
                <img src="${recipe.image}" class="card-img-top" alt="${recipe.label}">
                <div class="card-body">
                    <h5 class="card-title">${recipe.label}</h5>
                    <p class="card-text">Calories: ${Math.round(recipe.calories)}</p>
                    <p class="card-text">Cuisine: ${recipe.cuisineType ? recipe.cuisineType.join(', ') : 'Not specified'}</p>
                    <a href="${recipe.url}" target="_blank" class="btn btn-primary">View Recipe</a>
                </div>
            </div>
        `;

        row.appendChild(card);
    });

    resultContainer.appendChild(row);
}

function showError(message) {
    resultContainer.innerHTML = `<h5 class="text-center text-danger">${message}</h5>`;
}
