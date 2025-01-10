
import { fetchJSONData } from '../services/dataService.js'; // Modularizamos fetchJSONData
import { showRecipeDetails } from './recipeDetails.js'; // Reutilizamos la lógica del modal


// Crear las filas de la tabla de recetas
export function createRecipeTableRows(data) {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ''; // Limpiar filas existentes

    // Días de la semana
    const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    const currentDayIndex = new Date().getDay() - 1; // Obtener el día actual (0 = Domingo)

    // Crear una fila por cada día de la semana definidos en el array anteriormente declarado daysOfWeek
    daysOfWeek.forEach((day, index) => {
        const row = document.createElement('tr');

        // Columna Día
        const tdDay = document.createElement('td');
        tdDay.textContent = day;
        tdDay.classList.add('text-center', 'align-middle');
        row.appendChild(tdDay);

        // Celdas para desayuno, almuerzo, snack y cena
        ["desayuno", "almuerzo", "snack", "cena"].forEach(mealType => {
            const tdMeal = document.createElement('td');
            tdMeal.classList.add('text-center', 'align-middle');
            
            const button = createMealButton(data[index]?.data[mealType], mealType, currentDayIndex === index);
            tdMeal.appendChild(button);
            row.appendChild(tdMeal);
        });

        tbody.appendChild(row);
    });
}

// Crear un botón para un tipo de comida
function createMealButton(recipe, mealType, isCurrentDay) {
    const button = document.createElement('button');
    button.className = 'button_table btn btn-Light btn-padding-0 h-100';
    button.textContent = recipe?.title || "No disponible";

    // Añadir clases adicionales
    if (isCurrentDay) {
        button.classList.add('current-day');
    }

    // Añadir evento al botón
    if (recipe) {
        button.addEventListener('click', () => showRecipeDetails(recipe));
    } else {
        button.disabled = true;
    }

    return button;
}

// Función principal para inicializar la tabla
export async function initRecipeTable() {
    const recipesData = await fetchJSONData('/server/data/JSON/recipes.json');
    if (!recipesData || !recipesData.recipes) return; // Salir si no hay datos

    createRecipeTableRows(recipesData.recipes);
}

// Llamada automática al cargar el archivo
initRecipeTable();
