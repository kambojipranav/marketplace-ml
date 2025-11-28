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


ALL OUTPUTS
<img width="1340" height="842" alt="image" src="https://github.com/user-attachments/assets/f2cbc9d7-eeff-442f-9d08-60ec5e1b8a81" />
<img width="1750" height="683" alt="image" src="https://github.com/user-attachments/assets/226a5316-7367-478f-94e6-b9cb3ad25d0d" />
<img width="1720" height="447" alt="image" src="https://github.com/user-attachments/assets/c0e8bf0c-f6b8-436a-b030-d387c1cac72e" />
<img width="1786" height="758" alt="image" src="https://github.com/user-attachments/assets/dc7d0bec-46d7-4709-b450-c644f13281a5" />
<img width="1730" height="858" alt="image" src="https://github.com/user-attachments/assets/dd7fc430-57e7-4763-9a61-2efafcc06b7a" />
<img width="1602" height="638" alt="image" src="https://github.com/user-attachments/assets/712874d4-42cb-43a2-af4b-5afd82d250cb" />





.
.
.







formal read me file


project:
  name: Marketplace ML
  description: >
    Marketplace ML is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) based
    e-commerce platform enhanced with a Machine Learning recommendation feature.
    Users can upload, edit, delete, and search products dynamically.
    The platform includes a cosine similarity–based recommender engine 
    that intelligently displays similar products based on text metadata.

technologies_used:
  frontend:
    - React.js
    - Bootstrap 5
    - Axios
    - React Router
    - Toast UI (custom)
  backend:
    - Node.js
    - Express.js
    - Multer (image uploading)
    - MongoDB + Mongoose
  machine_learning:
    - Custom Cosine Similarity algorithm (no external ML library)
    - Basic NLP preprocessing (lowercasing, tokenization, vectorization)

core_features:
  - Add new products with images
  - Edit existing products (title, price, category, tags, description)
  - Delete products with smooth redirect experience
  - Live dynamic search with suggestions while typing
  - Manual search with fallback ("❌ No products found")
  - ML-powered "Similar Products" section using cosine similarity
  - Toast notifications instead of browser alerts
  - Responsive UI with Bootstrap cards and gradient background

how_search_works:
  step_by_step:
    - As user types into search bar, the frontend sends debounced requests.
    - Backend performs case-insensitive text search using MongoDB regex: `/bi/i`.
    - Suggestions appear in a dropdown.
    - If the user clicks "Search" → product list updates to matching items.
    - If no match exists → UI displays `"No products found"`.

recommendation_engine:
  goal: "Show users similar products based on metadata relevance."

  metadata_used:
    - Product Title
    - Product Category
    - Tags (keywords entered during upload)

  preprocessing_steps:
    - Convert text to lowercase
    - Remove special characters
    - Split text into individual tokens (words)
    - Create vocabulary list shared between products

  vectorization:
    example_explanation: |
      If two products produce the following token lists:

        Product A → ["sports", "racket", "shuttle"]
        Product B → ["tennis", "racket", "sports", "ball"]

      A joint vocabulary is created: 
        ["sports", "racket", "shuttle", "tennis", "ball"]

      Then convert products to vectors based on word frequency:

        Product A → [1, 1, 1, 0, 0]
        Product B → [1, 1, 0, 1, 1]

  cosine_similarity_math:
    formula: "cosineSimilarity(A, B) = dot(A,B) / (||A|| × ||B||)"
    breakdown: |
      dot(A,B) = sum(A[i] × B[i])
      
      norm(vector) = square_root( sum( value² ) )

      Example Calculation from vectors above:

      dot = (1×1) + (1×1) + (1×0) + (0×1) + (0×1) = 2

      magnitude(A) = √(1² + 1² + 1²) = √3 ≈ 1.732
      magnitude(B) = √(1² + 1² + 1² + 1²) = √4 = 2

      cosine similarity = 2 / (1.732 × 2) ≈ 0.577

      → Higher value means more similar.

  interpretation_scale:
    - "0.8 - 1.0 → Highly Similar"
    - "0.5 - 0.79 → Moderately Similar"
    - "0.2 - 0.49 → Slightly Similar"
    - "0.0 - 0.19 → Not Similar"

  usage_in_app: >
    When viewing any product, the backend compares its vector representation
    with all other products in the database and returns the top matches
    sorted by similarity score. These appear under a "Recommended Products" section.

application_flow:
  - User uploads product → toast shows → automatic redirect to home
  - User searches → dynamic suggestions appear
  - User views product → recommendation engine suggests related items
  - User can edit/delete → UI updates instantly and redirects with confirmation toast

folder_structure:
  tree: |
    marketplace-ml/
    ├── backend/
    │   ├── server.js          # REST API + routing + search + CRUD
    │   ├── mlEngine.js        # Cosine similarity engine
    │   └── uploads/           # Stored images
    └── frontend/
        ├── src/
        │   ├── components/
        │   │   ├── ProductCard.js
        │   │   ├── UploadForm.js
        │   │   ├── EditForm.js
        │   │   └── ToastMessage.js
        │   ├── pages/
        │   │   ├── Home.js
        │   │   └── ProductDetails.js
        │   └── App.js

running_the_project_locally:
  backend:
    - cd backend
    - npm install
    - node server.js
  frontend:
    - cd frontend
    - npm install
    - npm start

future_enhancements:
  - JWT authentication for sellers and buyers
  - Wishlist / Favorites system
  - Pagination + Sorting filters (low-high price, newest)
  - Admin dashboard with analytics
  - Cloud file storage (AWS S3)
  - Advanced NLP text similarity using TF-IDF or embeddings

summary: >
  Marketplace ML demonstrates how traditional CRUD-based web applications
  can be enhanced with machine learning techniques to deliver intelligent
  user experiences. From live search to personalized product recommendations,
  the project showcases scalable design, clean UI, and applied ML concepts
  without external AI libraries.
