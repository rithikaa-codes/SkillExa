const express = require("express");
const router = express.Router();
const multer = require("multer");
const pdf = require("pdf-parse");
const fs = require("fs");
const OpenAI = require("openai");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/analyze-resume", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const pdfData = await pdf(req.file.buffer);
    const resumeText = pdfData.text;

    const client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const aiResponse = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `
You are an expert AI career advisor.

From the given resume:
1. Extract key skills
2. Suggest top 3 suitable careers
3. Provide match percentage for each career
4. List missing skills
5. Suggest actionable next steps

Keep response structured and easy to read.
`
        },
        {
          role: "user",
          content: resumeText
        }
      ]
    });

    res.json({
      result: aiResponse.choices[0].message.content
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Resume analysis failed");
  }
});

module.exports = router;
