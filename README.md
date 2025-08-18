# Fit Set Go

Fit Set Go is a smart, interactive web application that calculates calories need to be consumed based by their personal details and their goals. We take information like age, height, weight, activity levels and custom dietary restrictions and based on it our app generates a proper meal plan from Monday to Sunday along with timing to consume, food to consume, it shows the macros it has, and also give the ingredients along with its quantity.
Now a normal user will not go to microsoft word and copy paste that information, so we also solved that part for users by converting this generated meal plan with downloadable pdf.
<img width="1919" height="865" alt="Screenshot 2025-07-26 143926" src="https://github.com/user-attachments/assets/d22ab2f7-e3a7-4d34-8ff9-6f010f30196c" />

AI generated meal plan
<img width="1919" height="866" alt="Screenshot 2025-07-26 144107" src="https://github.com/user-attachments/assets/3e4de661-1e4d-42bb-87ca-8d95d39235da" />

Pdf format
<img width="1919" height="866" alt="Screenshot 2025-07-26 144140" src="https://github.com/user-attachments/assets/4f938ba8-f73a-4fbf-a97d-4b17596f120b" />

---

## Features

- Calculates calories needed to achieve his/her goals(Weight Loss/ Weight Gain).
- Uses Gemini AI to generate personalized meal plans based on the user input given at the time of calorie calculation.
- Supports both Veg and Non-Veg preferences (with custom dietary restrictions).
- Exports the meal plan into a downloadable PDF.
- Dockerized for easy deployment.

---

## Tech Stack

- **Backend**: Spring Boot, Docker
- **Frontend**: HTML, CSS, JavaScript
- **AI Integration**: Google Gemini API
- **PDF Generation**: iText7 Library
- **Hosting**: Railway
