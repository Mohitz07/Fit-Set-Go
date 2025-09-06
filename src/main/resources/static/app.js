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
        calorieText.textContent = ` Your daily target: ${Math.round(target)} kcal (${dietReadable})`;

        // Create Gemini prompt
        const prompt = `You are a fitness and nutrition expert. Generate a Monday to Sunday meal plan that fits the calorie target and dietary preferences.

Instructions:
- Provide 3 meals (Breakfast, Lunch, Dinner) and 2 snacks
- Include meal names, estimated calories, protein, carbs, and fat
- List key ingredients
- Keep it culturally relevant to Indian food when possible
- Format clearly with days and meals

User Profile:
- Age: ${data.age}, Sex: ${data.sex}
- Height: ${data.heightCm} cm, Weight: ${data.weightKg} kg
- Activity Level: ${data.activityFactor}
- Goal: ${data.goal}
- Diet: ${data.diet}${customDiet ? `, ${customDiet}` : ''}
- Target: ${Math.round(target)} kcal/day`;

        // Get meal plan from Gemini
        const geminiRes = await fetch(`${geminiApi}/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt })
        });

        if (!geminiRes.ok) throw new Error('Meal plan generation failed');
        const mealPlanText = await geminiRes.text();

        mealPlan.textContent = mealPlanText;
        result.style.display = 'block';
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

    // Recipe Form Handler
    document.getElementById('recipe-form').addEventListener('submit', async (e) => {
      e.preventDefault();

      const loading = document.getElementById('recipe-loading');
      const output = document.getElementById('recipe-output');

      loading.classList.add('show');
      output.style.display = 'none';

      const ingredients = document.getElementById('ingredients').value;
      const calories = document.getElementById('recipe-calories').value;
      const cuisine = document.getElementById('cuisine').value;
      const diet = document.querySelector('input[name="recipe-diet"]:checked').value;

      let prompt = `You are a professional chef. Create a detailed recipe using these ingredients: ${ingredients}.`;
      if (calories) prompt += ` Target around ${calories} calories per serving.`;
      if (cuisine) prompt += ` Make it ${cuisine} style.`;
      if (diet) prompt += ` This should be ${diet}.`;

      prompt += `\n\nInclude:\n- Recipe name\n- Ingredients list\n- Step-by-step instructions\n- Nutritional info per serving\n- Cooking tips`;

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