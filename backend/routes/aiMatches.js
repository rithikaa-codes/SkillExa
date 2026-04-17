const express = require("express");
const router = express.Router();
const multer = require("multer");
const pdf = require("pdf-parse");
const fs = require("fs");
const OpenAI = require("openai");

const upload = multer({ storage: multer.memoryStorage() });

// STEP 1: RESUME TO ROLES MATCHING
router.post("/ai-matches", upload.single("resume"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  let resumeText = "";
  try {
      if (!req.file || !req.file.buffer) {
        throw new Error("No file buffer found.");
      }

      const pdfData = await pdf(req.file.buffer);
      resumeText = pdfData.text;
    } catch(err) {
      console.error("PDF Parsing Failed:", err);
      return res.status(500).json({ error: "Failed to parse PDF document.", message: err.message });
    }

    try {
      const client = new OpenAI({
        apiKey: process.env.GROQ_API_KEY,
        baseURL: "https://api.groq.com/openai/v1",
      });

      const aiResponse = await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `You are an expert career matcher.\n\nFrom this resume:\n* Identify key skills\n* Suggest top 3 suitable career roles ONLY\n* Output clean list:\n\n1. Role\n2. Role\n3. Role`
          },
          {
            role: "user",
            content: resumeText
          }
        ]
      });

      res.json({
        roles: aiResponse.choices[0].message.content
      });

    } catch (err) {
      console.error("AI Generation failed", err);
      return res.status(500).json({ error: "Analysis Failed.", message: err.message });
    }
});

// STEP 4: FETCH ROLE DETAILS
router.post("/ai-role-details", async (req, res) => {
  const { role } = req.body;

  if (!role) {
    return res.status(400).json({ error: "Role is required" });
  }

  try {
    const client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const aiResponse = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `For the role: ${role}

Return:
1. Required skills
2. Step-by-step roadmap (5 steps)
3. Free courses or workshops (real platforms like Coursera, YouTube, etc.)
4. Internship/job platforms (LinkedIn, Internshala, etc.)

Keep structured and concise.`
        },
        {
          role: "user",
          content: role
        }
      ]
    });

    res.json({
      details: aiResponse.choices[0].message.content
    });

    } catch (err) {
      console.error("Error fetching details", err);
      return res.status(500).json({ error: "Error fetching details" });
    }
});

module.exports = router;
