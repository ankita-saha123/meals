const getMealBtn = document.getElementById('getMealBtn');
const loader = document.getElementById('loader');
const mealFront = document.getElementById('mealFront');
const mealBack = document.getElementById('mealBack');
const mealCard = document.getElementById('mealCard');

getMealBtn.addEventListener('click', getRandomMeal);
mealCard.addEventListener('click', () => {
  mealCard.classList.toggle('flipped');
});

function getRandomMeal() {
  loader.classList.remove('hidden');
  mealFront.innerHTML = "";
  mealBack.innerHTML = "";

  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(data => {
      loader.classList.add('hidden');
      const meal = data.meals[0];
      displayMeal(meal);
    })
    .catch(err => {
      loader.classList.add('hidden');
      mealFront.innerHTML = "<p>⚠ Error loading meal. Try again!</p>";
      console.error(err);
    });
}

function displayMeal(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[strIngredient${i}];
    const measure = meal[strMeasure${i}];
    if (ing && ing.trim() !== "") {
      ingredients.push(${ing} - ${measure});
    }
  }

  // Front side (image + title)
  mealFront.innerHTML = `
    <div>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <h2>${meal.strMeal}</h2>
      <p><strong>${meal.strCategory}</strong> | ${meal.strArea}</p>
      <p>👆 Tap to see ingredients & instructions</p>
    </div>
  `;

  // Back side (ingredients + instructions)
  mealBack.innerHTML = `
    <h2>${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="ingredients">
      ${ingredients.map(i => <li>${i}</li>).join('')}
    </ul>
    <h3>Instructions:</h3>
    <p>${meal.strInstructions}</p>
  `;
}