require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

// Models
const Note = require("./models/Note");

// Routes
const authRoutes = require("./routes/auth");
const careerRoutes = require("./routes/career");
const aiRoutes = require("./routes/ai");
const aiCoachRoutes = require("./routes/aiRoutes");
const resumeRoutes = require("./routes/resume");
const aiMatchesRoutes = require("./routes/aiMatches");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("FATAL ERROR: MONGO_URI is not defined in .env file.");
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => console.log("SkillExa Cloud DB Connected"))
  .catch(err => console.error("DB Connection Failure:", err));

// Route Handlers
app.use("/auth", authRoutes); // /auth/register and /auth/login
app.use("/career", careerRoutes); // /career/:title
app.use("/careers", careerRoutes); // GET /careers to fetch all
app.use("/ai-career", aiRoutes); // mapped to /ai-career
app.use("/api/ai", aiCoachRoutes); // AI Chat Endpoint: /api/ai/chat
app.use("/", resumeRoutes); // /analyze-resume
app.use("/", aiMatchesRoutes); // /ai-matches and /ai-role-details

app.post("/save-notes", async (req, res) => {
  try {
    const { content } = req.body;

    const newNote = new Note({
      content
    });

    await newNote.save();

    res.send("Saved successfully");
  } catch (err) {
    res.status(500).send("Error saving notes");
  }
});

app.get("/get-notes", async (req, res) => {
  try {
    const notes = await Note.find().sort({ _id: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).send("Error fetching notes");
  }
});

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`SkillExa Backend Online: Port ${PORT}`));
