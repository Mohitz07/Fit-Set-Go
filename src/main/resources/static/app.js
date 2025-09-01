const api = 'https://fitsetgo.onrender.com/api';
const geminiApi = 'https://fitsetgo.onrender.com/gemini';

const age = document.getElementById('age');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const sex = document.getElementById('sex');
const activity = document.getElementById('activity');
const goal = document.getElementById('goal');
const customDiet = document.getElementById('custom-diet');
const loadingText = document.getElementById('loading');

const calories = document.getElementById('calories');
const pdfBtn = document.getElementById('pdfBtn');
const geminiResultDiv = document.getElementById('gemini-result');

document.getElementById('form').addEventListener('submit', async e => {
  e.preventDefault();

    // Show loading message
  loadingText.style.display = 'block';
  calories.textContent = '';
  geminiResultDiv.textContent = '';
  pdfBtn.style.display = 'none';

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
    // 1. Calculate calories
    const res = await fetch(`${api}/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error('Calorie calculation failed');
    const target = await res.json();

    const dietReadable = data.diet === 'VEG' ? 'Veg' : 'Veg and Non-Veg';
    calories.textContent = `Your target: ${Math.round(target)} kcal/day (${dietReadable})`;

    // 2. Create prompt for Gemini
    const prompt = `You are a fitness and nutrition expert. Based on the users profile, generate a Monday to Sunday meal plan that fits the calorie target and dietary preferences.
    Start directly with the day. Do not include any introduction or extra lines above the meal plan.

Instructions:
- Provide 3 meals ((Bold text)(Breakfast, Lunch, Dinner)) and 2 snacks.
- Mention each meals name, estimated calories, protein, carbs, and fat.
- Mention ingredients
- Keep it simple and culturally relevant to Indian food if possible.

User Profile:
- Age: ${data.age}
- Sex: ${data.sex}
- Height: ${data.heightCm} cm
- Weight: ${data.weightKg} kg
- Activity Level: ${data.activityFactor}
- Fitness Goal: ${data.goal}
- Dietary Preference: ${data.diet}
- Custom Dietary Preference: ${data.diet}${customDiet.value ? `, ${customDiet.value}` : ''}
- Target Calories: ${Math.round(target)} kcal

Example Format:
    Breakfast
  Paneer Paratha with Curd
  Calories: 400 kcal | Protein: 20g | Carbs: 35g | Fat: 18g`;

    // 3. Call Gemini
    const geminiRes = await fetch(`${geminiApi}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    if (!geminiRes.ok) throw new Error('API failed');
    const geminiText = await geminiRes.text();

    geminiResultDiv.textContent = geminiText;

    // 4. Show Gemini PDF download button
    pdfBtn.style.display = 'inline-block';
    pdfBtn.onclick = () => downloadGeminiPdf(geminiText);

  } catch (err) {
    console.error(err);
    calories.textContent = 'An error occurred. Please try again.';
    geminiResultDiv.textContent = '';
    pdfBtn.style.display = 'none';
  }
});

async function downloadGeminiPdf(text) {
  try {
    const res = await fetch(`${geminiApi}/pdf`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    if (!res.ok) throw new Error('PDF download failed');
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Fit-Set-Go-meal-plan.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    alert('Failed to download PDF');
    console.error(err);
  }
}
