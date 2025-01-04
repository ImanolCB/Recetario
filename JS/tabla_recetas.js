const breakfastRequirements = ['tortilla']; // Array con requisitos para desayuno
const lunchRequirements = ['Pasta Carbonara']; // Array con requisitos para comida
const dinnerRequirements = ['Caldo de Verduras']; // Array con requisitos para cena

// Función para obtener datos de un archivo JSON
async function fetchJSONData(path) {
    try {
        const res = await fetch(path);
        if (!res.ok) {
            throw new Error(`Error al conectar: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("No se ha podido obtener la información:", error);
        return null;
    }
}

// Función para buscar recetas en base a los requisitos
function searchRecipesByCategory(data, requirements) {
    return data.filter(recipe =>
        requirements.some(req => recipe.title.toLowerCase().includes(req.toLowerCase()))
    );
}

// Función para crear las filas de la tabla
function createRecipeTableRows(data) {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ''; // Limpiar filas existentes

    // Días de la semana
    const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

    // Obtener el índice del día actual (0 - Lunes, 6 - Domingo)
    const currentDayIndex = new Date().getDay()-1; // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado

    daysOfWeek.forEach((day, index) => {
        const row = document.createElement('tr');

        // Columna Día
        const tdDay = document.createElement('td');
        tdDay.textContent = day;
        row.appendChild(tdDay);

        // Crear las celdas para desayuno, almuerzo, snack y cena
        ["desayuno", "almuerzo", "snack", "cena"].forEach(mealType => {
            const tdMeal = document.createElement('td');
            tdMeal.classList.add('text-center', 'align-middle');
            const button = document.createElement('button','h-100');
            button.className = 'button_table';
            const recipe = data[index].data[mealType];

            // Si es el día actual, se le agrega la clase 'current-day'
            if (index === currentDayIndex) {
                button.classList.add('current-day');
            }

            button.textContent = recipe.title;
            button.classList.add('btn', 'btn-Light', 'btn-padding-0');
            button.addEventListener('click', () => showRecipeDetails(recipe));

            tdMeal.appendChild(button);
            row.appendChild(tdMeal);
        });

        tbody.appendChild(row);
    });
}

// Función para mostrar los detalles de la receta en el modal
function showRecipeDetails(recipe) {
    const modal = document.getElementById('recipeModal');
    const modalTitle = document.querySelector('.modal-title');
    const modalBody = document.querySelector('.modal-body');

    modalTitle.textContent = recipe.title;
    modalBody.innerHTML = `
        <p><strong>Categoría:</strong> ${recipe.category}</p>
        <p><strong>Ingredientes:</strong> ${recipe.ingredients.join(', ')}</p>
        <p><strong>Pasos:</strong> ${recipe.steps.join('<br>')}</p>
        <p><strong>Duración:</strong> ${recipe.duration}</p>
    `;
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
}

// Obtener los datos de las recetas y procesarlos
async function main() {
    const recipesData = await fetchJSONData('../JSON/recipes.json');
    if (!recipesData || !recipesData.recipes) return;

    // Llamada a la función para crear las filas de la tabla
    createRecipeTableRows(recipesData.recipes);
}

// Ejecutar la función principal
main();
