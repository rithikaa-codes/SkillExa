const express = require("express");
const { OpenAI } = require("openai");
const { authenticateToken } = require("../middleware/auth");
const router = express.Router();

router.post("/", authenticateToken, async (req, res) => {
  const { prompt, studyTime, streak, completedTasks, weakAreas } = req.body;
  
  if (!process.env.OPENAI_API_KEY) {
     // Return a high-quality mock response instead of connecting to OpenAI
     return res.json({ 
        advice: `Based on your recent study time of ${studyTime || 0} minutes and a streak of ${streak || 0} days, I recommend dedicating the next 48 hours to deep-work sessions focusing specifically on ${weakAreas || "core principles"}. Your persistence is building a solid architectural foundation.`,
        plan: "Accelerated Skill Protocol Initiated.", 
        suggestion: "Prioritize hands-on lab exercises immediately after theoretical review.",
        weakness: "Mock API active. Update .env for real-time analysis."
     });
  }

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an elite AI Career Coach for SkillExa. Provide architectural career advice." },
        { role: "user", content: `Analyze progress: Total Study: ${studyTime}s, Streak: ${streak} days. Focus Area: ${weakAreas}. Give me a 3-point plan.` }
      ],
    });

    res.json({ 
       advice: completion.choices[0].message.content,
       plan: "Personalized Protocol Synchronized",
       suggestion: "Continuous focus on architectural mastery."
    });
  } catch (error) {
    res.status(500).json({ error: "AI synchronization interrupted." });
  }
});

module.exports = router;
