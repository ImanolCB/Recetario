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

function createRecipeTableRows(data) {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ''; // Limpiar filas existentes

    // Días de la semana
    const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

    // Obtener el índice del día actual
    const currentDayIndex = new Date().getDay() - 1; // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado

    daysOfWeek.forEach((day, index) => {
        const row = document.createElement('tr');

        // Columna Día
        const tdDay = document.createElement('td');
        tdDay.textContent = day;
        tdDay.classList.add('text-center', 'align-middle');
        row.appendChild(tdDay);

        // Crear las celdas para desayuno, almuerzo, snack y cena
        ["desayuno", "almuerzo", "snack", "cena"].forEach(mealType => {
            const tdMeal = document.createElement('td');
            tdMeal.classList.add('text-center', 'align-middle');
            
            // Crear botón para la receta
            const button = document.createElement('button');
            button.className = 'button_table btn btn-Light btn-padding-0 h-100';
            const recipe = data[index]?.data[mealType];

            // Si es el día actual, se le agrega la clase 'current-day'
            if (index === currentDayIndex) {
                button.classList.add('current-day');
            }

            // Asignar el título de la receta al botón
            button.textContent = recipe?.title || "No disponible";
            
            // Agregar evento para mostrar detalles de la receta
            if (recipe) {
                button.addEventListener('click', () => showRecipeDetails(recipe));
            } else {
                button.disabled = true;
            }

            tdMeal.appendChild(button);
            row.appendChild(tdMeal);
        });

        tbody.appendChild(row);
    });
}


function showRecipeDetails(recipe) {
    const modal = document.getElementById('recipeModal');
    const modalTitle = document.querySelector('.modal-title');
    const modalBody = document.querySelector('.modal-body');

    // Limpiar contenido anterior del modal
    modalTitle.textContent = '';
    modalBody.textContent = '';

    // Configurar título del modal
    modalTitle.textContent = recipe.title;

    // Crear y agregar detalles de la receta al modal
    const categoryParagraph = document.createElement('p');
    categoryParagraph.innerHTML = `<strong>Categoría:</strong> ${recipe.category}`;
    modalBody.appendChild(categoryParagraph);

    const ingredientsParagraph = document.createElement('p');
    ingredientsParagraph.innerHTML = `<strong>Ingredientes:</strong> ${recipe.ingredients.join(', ')}`;
    modalBody.appendChild(ingredientsParagraph);

    const stepsParagraph = document.createElement('p');
    stepsParagraph.innerHTML = `<strong>Pasos:</strong> ${recipe.steps.join('<br>')}`;
    modalBody.appendChild(stepsParagraph);

    const durationParagraph = document.createElement('p');
    durationParagraph.innerHTML = `<strong>Duración:</strong> ${recipe.duration}`;
    modalBody.appendChild(durationParagraph);

    const image = document.createElement('img');
    image.src = 'media/images/' + recipe.image;
    image.alt = recipe.title;
    image.className = 'img-fluid';
    modalBody.appendChild(image);

    // Mostrar el modal
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
