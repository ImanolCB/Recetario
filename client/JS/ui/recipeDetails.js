
export function showRecipeDetails(recipe) {
    const modal = document.getElementById('recipeModal');
    const modalTitle = document.querySelector('.modal-title');
    const modalBody = document.querySelector('.modal-body');

    modalTitle.textContent = recipe.title;
    modalBody.innerHTML = `
        <p><strong>Categoría:</strong> ${recipe.category}</p>
        <p><strong>Ingredientes:</strong> ${recipe.ingredients.join(', ')}</p>
        <p><strong>Pasos:</strong> ${recipe.steps.join('<br>')}</p>
        <p><strong>Duración:</strong> ${recipe.duration}</p>
        <img src="media/images/recipes/${recipe.image}" class="img-fluid" alt="${recipe.title}">
    `;

    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
}
