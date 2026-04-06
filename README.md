# SkillExa 🚀

**Elevate Your Career Legacy**

SkillExa is a state-of-the-art career optimization platform designed to architect your professional future. Use intelligent AI guidance, structured resource tracking, and high-performance note-taking systems to stay ahead in your industry.

---

## ✨ Key Features

- **🧠 AI Career Coach**: A synchronized architecture that provides tailored career advice, skill mapping, and industry insights.
- **📊 Interactive Dashboard**: Monitor your career growth, streak metrics, and current focus areas in real-time.
- **📓 Laboratory Notes**: A professional, multi-color highlighting editor for deep learning and knowledge retention.
- **📚 Integrated Learning Resources**: Career-specific educational material curated to boost your professional value.
- **🔥 Persistence Streaks**: Gamified tracking to keep you consistent with your learning and career development.
- **✨ Premium UI/UX**: Fluid experiences built with **Framer Motion** and a modern, high-contrast aesthetic.

## 🛠️ Technology Stack

- **Frontend**: React.js (v19), Framer Motion, React Router.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (via Mongoose).
- **Intelligence**: OpenAI & Gemini API integration.
- **Styling**: Modern CSS with consistent design tokens.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas account or local instance.
- APIs: OpenAI API Key or Gemini API Key.

### Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/rithikaa-codes/SkillExa.git
    cd SkillExa
    ```

2.  **Backend Configuration**
    - Navigate to `/backend`
    - Create a `.env` file with:
      ```env
      PORT=5000
      MONGO_URI=your_mongodb_uri
      JWT_SECRET=your_secret_key
      OPENAI_API_KEY=your_key
      GEMINI_API_KEY=your_key
      ```
    - Run `npm install`
    - Start the server: `node server.js`

3.  **Frontend Configuration**
    - Navigate to `/frontend`
    - Run `npm install`
    - Start the application: `npm start`

---

## 📂 Project Structure

```text
SkillExa/
├── backend/
│   ├── models/       # Mongoose Schemas
│   ├── routes/       # API endpoints (Auth, AI, Career)
│   ├── middleware/   # Request processing
│   └── server.js     # Entry point
└── frontend/
    ├── src/
    │   ├── components/ # Reusable UI pieces (AICoach, Tracker, etc.)
    │   └── pages/      # Views (Dashboard, Auth, Explorer)
    └── public/         # Static assets
```

---

## 🤝 Contributing

We welcome professional contributions! Please fork the repository and submit a pull request for any architectural enhancements.

---

## ⚖️ License

Crafted with ❤️ by **Rithikaa K**.  
Distributed under the ISC License.

---

*Architecting the future, one skill at a time.*
