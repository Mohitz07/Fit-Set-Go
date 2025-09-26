// API endpoints
const api = 'https://fitsetgo.up.railway.app/api';
const geminiApi = 'https://fitsetgo.up.railway.app/gemini';

// Navigation
function showSection(sectionId, btn) {
  // Switch visible section
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(sectionId).classList.add('active');

  // Update navigation active state
  document.querySelectorAll('.nav-btn').forEach(link => {
    link.classList.remove('active');
  });
  btn.classList.add('active');
}
function showSection(sectionId) {
      document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
      });
      document.getElementById(sectionId).classList.add('active');
    }
// Calorie Form Handler
document.getElementById('calorie-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const loading = document.getElementById('calorie-loading');
  const result = document.getElementById('calorie-result');
  const calorieText = document.getElementById('calorie-text');
  const mealPlan = document.getElementById('meal-plan');
  const downloadBtn = document.getElementById('download-pdf');

  loading.classList.add('show');
  result.style.display = 'none';
  mealPlan.textContent = '';  // Clear previous meal plan if any
  downloadBtn.style.display = 'none';

  const selectedDiet = document.querySelector('input[name="diet"]:checked');
  const customDiet = document.getElementById('custom-diet').value;

  const data = {
    age: +document.getElementById('age').value,
    heightCm: +document.getElementById('height').value,
    weightKg: +document.getElementById('weight').value,
    sex: document.getElementById('sex').value,
    activityFactor: +document.getElementById('activity').value,
    goal: document.getElementById('goal').value,
    diet: selectedDiet.value
  };

  try {
    // Calculate calories
    const res = await fetch(`${api}/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error('Calorie calculation failed');
    const target = await res.json();

    const dietReadable = data.diet === 'VEG' ? 'Vegetarian' : 'Vegetarian & Non-Vegetarian';

    // 1. Show calorie target immediately
    calorieText.textContent = ` Your daily target: ${Math.round(target)} calories (${dietReadable})`;
    result.style.display = 'block';

    // 2. Now generate Gemini prompt and meal plan
    const prompt = `You are a fitness and nutrition expert. Please reply in plain text only. Do not use any markdown formatting or special characters like asterisks. Based on the users profile, generate a Monday to Sunday meal plan that fits the calorie target and dietary preferences.
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
                    - Custom Dietary Preference: ${data.diet}${customDiet ? `, ${customDiet}` : ''}
                    - Target Calories: ${Math.round(target)} kcal

                    Example Format:
                        Breakfast
                      Paneer Paratha with Curd
                      Calories: 400 kcal | Protein: 20g | Carbs: 35g | Fat: 18g`;

    const geminiRes = await fetch(`${geminiApi}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    if (!geminiRes.ok) throw new Error('Meal plan generation failed');
    const mealPlanText = await geminiRes.text();

    // Show the meal plan and download button
    mealPlan.textContent = mealPlanText;
    downloadBtn.style.display = 'inline-flex';
    downloadBtn.onclick = () => downloadPDF(mealPlanText);

  } catch (error) {
    calorieText.textContent = 'Error generating plan. Please try again.';
    result.style.display = 'block';
    console.error(error);
  } finally {
    loading.classList.remove('show');
  }
});

// Recipe Form Handler for single textarea
document.getElementById('recipe-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const loading = document.getElementById('recipe-loading');
  const output = document.getElementById('recipe-output');

  loading.classList.add('show');
  output.style.display = 'none';

  // Get user prompt directly from textarea
  const userInput = document.getElementById('recipe-input').value;
  const prompt = `Suppose you are a chef, Generate indian recipe based on user input ${userInput} (keep it concise and simple) for only one serving`;

  try {
    const res = await fetch(`${geminiApi}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    if (!res.ok) throw new Error('Recipe generation failed');
    const recipe = await res.text();

    output.textContent = recipe;
    output.style.display = 'block';

  } catch (error) {
    output.textContent = 'Failed to generate recipe. Please try again.';
    output.style.display = 'block';
    console.error(error);
  } finally {
    loading.classList.remove('show');
  }
});


// PDF Download Function
async function downloadPDF(text) {
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
    a.download = 'FitSetGo-Meal-Plan.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    alert('Failed to download PDF. Please try again.');
    console.error(error);
  }
}