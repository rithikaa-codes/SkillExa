const express = require("express");
const { OpenAI } = require("openai");

const router = express.Router();

// 1. Configure OpenAI SDK
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "dummy", 
});

// 2. Main AI Chat Route: POST /api/ai/chat
router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const msgLower = (message || "").toLowerCase().trim();

    // 1. OPTIONAL OPTIMIZATION: Quick Check for Casual Intent
    const greetings = ["hi", "hello", "hey", "hola", "hi coach"];
    const thanks = ["thank you", "thanks", "thx", "awesome", "ok", "okay", "nice", "got it"];

    if (greetings.includes(msgLower)) {
      return res.json({ reply: "Hello! I am your SkillExa Cognitive Coach. How can I help you build your future today? 😊" });
    }
    if (thanks.includes(msgLower)) {
      return res.json({ reply: "You're very welcome! Let me know if you need any more career guidance. Build on! 🚀" });
    }

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "your_key_here") {

      return res.json({
        reply: "⚠️ AI Core Offline: Missing OPENAI_API_KEY. Add it to your .env file to enable live career architecting."
      });
    }

    // 3. Connect to Groq (llama-3.3-70b-versatile)
    const client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are an elite SkillExa Cognitive Coach.
                    - If the user says something casual (hi, hello, how are you, thank you, ok), respond naturally, briefly, and professionally like a human.
                    - Provide high-quality career advice for ANY field the user asks about (e.g., Fashion, Engineering, Medicine, etc.).
                    - If the user asks for a career-related query (roadmap, skills, etc), provide the structured output:
                    1. Career Suggestion
                    2. Required Skills
                    3. Step-by-Step Roadmap
                    4. Resources.`
        },
        {
          role: "user",
          content: message
        }
      ]
    });


    // 4. Return structured response
    res.json({
      reply: response.choices[0].message.content
    });

  } catch (error) {
    console.error("AI Coach Error:", error);
    res.status(500).json({ error: "Cognitive Suite offline." });
  }
});

router.post("/diagnostics", async (req, res) => {
  try {
    const { role } = req.body;
    if (!role) return res.status(400).json({ error: "Role required for diagnostic synthesis." });

    const client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const prompt = `Generate 5 challenging multiple-choice questions for a professional ${role} certification. 
    Format MUST be a JSON object with exactly this structure:
    { "questions": [ { "text": "...", "options": ["...", "...", "...", "..."], "correct": index_0_to_3 } ] }
    Return ONLY the raw JSON.`;

    console.log("Synthesizing questions for role:", role);

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { 
          role: "system", 
          content: "You are an elite SkillExa Assessment Engine. Return ONLY a valid JSON object. No conversation, no markdown blocks." 
        },
        { role: "user", content: prompt }
      ]
    });

    let content = response.choices[0].message.content.trim();
    console.log("Raw AI Response received. Length:", content.length);
    
    // Cleanup markdown if present
    if (content.startsWith("```")) {
      content = content.replace(/^```json/, "").replace(/```$/, "").trim();
    }
    
    try {
      const data = JSON.parse(content);
      console.log("Successfully parsed JSON diagnostics.");
      res.json(data);
    } catch (parseErr) {
      console.error("JSON Parse Error:", parseErr, "Content Preview:", content.slice(0, 100));
      // Return a high-quality fallback if AI fails to format
      res.json({
        questions: [
          { text: `What is a primary responsibility of a ${role}?`, options: ["Operations", "Strategic Planning", "Technical Execution", "All of the above"], correct: 3 },
          { text: `Which tool is most essential for a modern ${role}?`, options: ["Visual Studio Code", "Industry Standard Software", "Communication Platforms", "Data Analytics"], correct: 1 }
        ]
      });
    }

  } catch (error) {
    console.error("Diagnostics Error:", error);
    res.status(500).json({ error: "Diagnostic synthesis failed." });
  }
});

module.exports = router;
