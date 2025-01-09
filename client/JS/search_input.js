const searchInput = document.querySelector('.buscador');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredRecipes = allRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm)
    );
    createRecipeTableRows(filteredRecipes);
});
