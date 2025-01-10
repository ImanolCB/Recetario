async function fetchRecipes() {
    try {
        // Realiza la solicitud al endpoint de la API
        const response = await fetch('http://localhost:5000/api/recipes');
        if (!response.ok) {
            throw new Error(`Error al obtener recetas: ${response.status}`);
        }
        // Devuelve las recetas en formato JSON
        const recipes = await response.json();
        return recipes;
    } catch (error) {
        console.error(error);
        return [];
    }
}

function displayRecipes(recipes) {
    const recipeList = document.getElementById('recipe-list'); // Asegúrate de tener este contenedor en tu HTML

    // Limpiar cualquier contenido previo
    recipeList.innerHTML = '';

    if (recipes.length === 0) {
        recipeList.innerHTML = '<p>No hay recetas disponibles.</p>';
        return;
    }

    // Iterar sobre las recetas y agregarlas al DOM
    recipes.forEach(recipe => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item'; // Clases de Bootstrap
        listItem.textContent = `${recipe.name} - ${recipe.category}`;
        recipeList.appendChild(listItem);
    });
}

async function main() {
    const recipes = await fetchRecipes();
    displayRecipes(recipes);
}

// Ejecutar la función principal
main();
