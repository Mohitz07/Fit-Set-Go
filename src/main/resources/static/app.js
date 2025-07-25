const api = 'http://localhost:8080/api';
const geminiApi = 'http://localhost:8080/gemini';

const age = document.getElementById('age');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const sex = document.getElementById('sex');
const activity = document.getElementById('activity');
const goal = document.getElementById('goal');

const calories = document.getElementById('calories');
const pdfBtn = document.getElementById('pdfBtn');
const geminiResultDiv = document.getElementById('gemini-result');

document.getElementById('form').addEventListener('submit', async e => {
  e.preventDefault(); // Prevent page reload

  const selectedDiet = document.querySelector('input[name="diet"]:checked');
  const dietValue = selectedDiet ? selectedDiet.value : null;

  const data = {
    age: +age.value,
    heightCm: +height.value,
    weightKg: +weight.value,
    sex: sex.value,
    activityFactor: +activity.value,
    goal: goal.value,
    diet: dietValue
  };

  try {
    // 1. Calculate calories from backend
    const res = await fetch(`${api}/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error('Calorie calculation failed');
    const target = await res.json();

    const dietReadable = data.diet === 'VEG' ? 'Vegetarian' : 'Non-Vegetarian';
    calories.textContent = `Your target: ${Math.round(target)} kcal/day (${dietReadable})`;

    pdfBtn.style.display = 'inline-block';
    pdfBtn.onclick = () => downloadPdf(data);

    // 2. Generate prompt for Gemini
    const prompt = `
    You are a fitness and nutrition expert. Based on the users profile, generate a full-day meal plan that fits the calorie target and dietary preferences.

    User Profile:
    - Age: ${data.age}
    - Sex: ${data.sex}
    - Height: ${data.heightCm} cm
    - Weight: ${data.weightKg} kg
    - Activity Level: ${data.activityFactor}
    - Fitness Goal: ${data.goal}
    - Dietary Preference: ${data.diet}
    - Target Calories: ${Math.round(target)} kcal

    Instructions:
    - Provide 3 meals (Breakfast, Lunch, Dinner) and 2 snacks.
    - Mention each meal's name, ingredients, estimated calories, protein, carbs, and fat.
    - Keep it simple and culturally relevant to Indian food if possible.
    - Use markdown-style formatting.

    Output Format Example:

    ** Breakfast **
    - * Paneer Paratha with Curd *
    - Calories: 400 kcal | Protein: 20g | Carbs: 35g | Fat: 18g

    ** Snack 1 **
    - ...

    Ensure the total daily calories match the target.
    `;


    const geminiRes = await fetch(`${geminiApi}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    if (!geminiRes.ok) throw new Error('Gemini API failed');
    const geminiText = await geminiRes.text();

    geminiResultDiv.textContent = geminiText;
  } catch (err) {
    console.error(err);
    calories.textContent = 'An error occurred. Please try again.';
    geminiResultDiv.textContent = '';
    pdfBtn.style.display = 'none';
  }
});

async function downloadPdf(payload) {
  try {
    const res = await fetch(`${api}/mealplan/pdf`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error('PDF download failed');
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mealplan.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    alert('Failed to download PDF');
    console.error(err);
  }
}
