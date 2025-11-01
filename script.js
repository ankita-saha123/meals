const getMealBtn = document.getElementById('getMealBtn');
const loader = document.getElementById('loader');
const mealFront = document.getElementById('mealFront');
const mealBack = document.getElementById('mealBack');
const mealCard = document.getElementById('mealCard');

getMealBtn.addEventListener('click', getRandomMeal);
mealCard.addEventListener('click', toggleCard);

// Allow keyboard flipping (Enter / Space)
mealCard.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleCard();
  }
});

function toggleCard() {
  const flipped = mealCard.classList.toggle('flipped');
  mealCard.setAttribute('aria-pressed', flipped ? 'true' : 'false');
  mealBack.setAttribute('aria-hidden', flipped ? 'false' : 'true');
}

function getRandomMeal() {
  loader.classList.remove('hidden');
  loader.setAttribute('aria-hidden', 'false');
  getMealBtn.disabled = true;
  mealFront.innerHTML = "";
  mealBack.innerHTML = "";

  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(data => {
      loader.classList.add('hidden');
      loader.setAttribute('aria-hidden', 'true');
      getMealBtn.disabled = false;
      displayMeal(data.meals[0]);
    })
    .catch(err => {
      loader.classList.add('hidden');
      loader.setAttribute('aria-hidden','true');
      getMealBtn.disabled = false;
      mealFront.innerHTML = "<p>⚠ Error loading meal. Try again!</p>";
      console.error(err);
    });
}

function displayMeal(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim() !== "") {
      ingredients.push(`${ing} - ${measure}`);
    }
  }

  // Front
  mealFront.innerHTML = `
    <div>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <h2>${meal.strMeal}</h2>
      <p><strong>${meal.strCategory}</strong> | ${meal.strArea}</p>
      <p>👆 Tap to see ingredients & instructions</p>
    </div>
  `;

  // Back
  mealBack.innerHTML = `
    <h2>${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="ingredients">
      ${ingredients.map(i => `<li>${i}</li>`).join('')}
    </ul>
    <h3>Instructions:</h3>
    <p class="instructions">${meal.strInstructions}</p>
  `;
}
