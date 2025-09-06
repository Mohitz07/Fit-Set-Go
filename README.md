# Fit Set Go

Fit Set Go is a smart, interactive web application that calculates calories need to be consumed based by their personal details and their goals. We take information like age, height, weight, activity levels and custom dietary restrictions and based on it our app generates a proper meal plan from Monday to Sunday along with timing to consume, food to consume, it shows the macros it has, and also give the ingredients along with its quantity.
Now a normal user will not go to microsoft word and copy paste that information, so we also solved that part for users by converting this generated meal plan with downloadable pdf.

# Architecture
![image0](https://github.com/user-attachments/assets/bd9d505f-c2f1-4aaf-ba0e-974a91d99e12)

# Home
<img width="1897" height="866" alt="image" src="https://github.com/user-attachments/assets/9a1dab4a-d542-438a-aa53-245d333727df" />


# Targeted Calories
<img width="1779" height="865" alt="image" src="https://github.com/user-attachments/assets/62dd6dc4-c179-4f39-8522-150d33e293cf" />

# Your Personalized 7-day meal plan
<img width="1767" height="862" alt="image" src="https://github.com/user-attachments/assets/e51c1edc-94d9-474d-901e-6ab46c55c73e" />


# Pdf format
<img width="1919" height="866" alt="Screenshot 2025-07-26 144140" src="https://github.com/user-attachments/assets/4f938ba8-f73a-4fbf-a97d-4b17596f120b" />

# Recipe Generator
<img width="1919" height="859" alt="image" src="https://github.com/user-attachments/assets/b1edcaad-ee16-44a4-804d-09e7e4735faf" />

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
