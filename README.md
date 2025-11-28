# 🛍️ Marketplace ML — Full Stack MERN Project with Recommendation System

A modern full-stack marketplace built with **MongoDB, Express.js, React.js, Node.js**, and a **Machine Learning Recommendation Engine**.  
This project allows users to **upload products**, **search dynamically**, **edit details**, and **view AI-based similar product suggestions**.

---

## 🚀 Features

| Feature | Description |
|--------|-------------|
| Add Products | Upload product details + image |
| Update Product | Edit price, description, title, category, tags |
| Delete Product | Remove products with smooth redirect UX |
| Live Search | Results filter instantly as you type (e.g., typing `bi → bingo, biriyani`) |
| Full Search Button | If user clicks search manually, results show or message "No products found" |
| ML Recommendations | Suggest similar items based on title/category/tag similarity using cosine similarity |
| Toast Notifications | No alerts — clean UI feedback using Bootstrap toasts |
| Smooth Navigation | After CRUD actions, user is redirected to homepage |

---

## 🧠 How the Recommendation System Works

The ML logic uses **Cosine Similarity**, a mathematical method used in NLP and recommendation engines.

### Steps:

1. We extract text features from each product:

2. The text is tokenized into individual words (`split`, `lowercased`, no punctuation).

3. A vocabulary is built using words from:
- target product  
- all other products  

4. Each product becomes a **vector**, representing the frequency of each word.

Example:

| Word | shuttle bat | tennis racket |
|------|-------------|---------------|
| shuttle | 1 | 0 |
| bat | 1 | 0 |
| tennis | 0 | 1 |
| racket | 1 | 1 |

5. The system calculates **cosine similarity** between vectors:

<img width="312" height="27" alt="image" src="https://github.com/user-attachments/assets/e9f054fd-5b92-416b-9ecb-72be30b35faa" />

This outputs a value between:

| Score Range | Meaning |
|------------|---------|
| 0.9–1.0 | Almost identical |
| 0.5–0.8 | Similar |
| 0.1–0.4 | Slight similarity |
| 0.0 | Completely unrelated |

6. We sort results by similarity and show the **top matches**.

---

## 🔍 How Search Works

The project supports **two types of search**:

| Type | Behavior |
|------|----------|
| Live Search | Shows suggestions instantly while typing |
| Click Search Button | Filters the main product list based on entered text |

Backend uses regex-based case-insensitive search:
<img width="473" height="271" alt="image" src="https://github.com/user-attachments/assets/3a676c88-0beb-426c-9461-2ee9f3849f3e" />


<img width="569" height="493" alt="image" src="https://github.com/user-attachments/assets/3e50115a-9a69-4f32-b8a5-e8d16fd03f69" />

<img width="955" height="553" alt="image" src="https://github.com/user-attachments/assets/c201681d-7283-49d6-bd3d-02332ee4d503" />
📦 File Structure
<img width="475" height="550" alt="image" src="https://github.com/user-attachments/assets/c183dab8-3124-49a3-a11e-9fd4c0e92dd9" />
<img width="622" height="331" alt="image" src="https://github.com/user-attachments/assets/c008a958-fac5-4010-8384-5aac25087153" />
<img width="849" height="317" alt="image" src="https://github.com/user-attachments/assets/02c64f2e-47f7-4faf-820b-ae31ac128ffa" />
<img width="838" height="415" alt="image" src="https://github.com/user-attachments/assets/e3cd338a-521d-419e-b851-c4c3f1b4529f" />
