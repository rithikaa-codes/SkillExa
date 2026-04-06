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
      return res.json({ reply: "Hello! I am your SkillExa AI Career Architect. How can I help you build your future today? 😊" });
    }
    if (thanks.includes(msgLower)) {
      return res.json({ reply: "You're very welcome! Let me know if you need any more career guidance. Build on! 🚀" });
    }

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "your_key_here") {

      return res.json({
        reply: "⚠️ AI Core Offline: Missing OPENAI_API_KEY. Add it to your .env file to enable live career architecting."
      });
    }

    // 3. Connect to OpenAI (gpt-4o-mini)
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an elite SkillExa AI Career Architect.
                    - If the user says something casual (hi, hello, how are you, thank you, ok), respond naturally, briefly, and professionally like a human.
                    - ONLY if the user asks for a career-related query (roadmap, skills, etc), provide the structured output:
                    1. Career Suggestion
                    2. Required Skills (bullets)
                    3. Step-by-Step Roadmap (numbered)
                    4. Resources (optional).`
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
    console.error("AI Route Error:", error);

    // FIX: Fallback to high-quality mock if quota is exceeded
    if (error.status === 429 || error.message?.includes("insufficient_quota")) {
      const fallbackReplies = {
        "full stack": "1. Career Suggestion: Full Stack Developer\n\n2. Required Skills: \n- Frontend: React, Next.js, CSS/Tailwind\n- Backend: Node.js, Express, PostgreSQL/MongoDB\n- DevOps: Docker, CI/CD, AWS\n\n3. Step-by-Step Roadmap:\n- Step 1: Master semantic HTML and modern CSS flexbox/grid.\n- Step 2: Build deep expertise in Javascript/TypeScript and React.\n- Step 3: Architect robust server-side logic and database schemas with relational data.\n- Step 4: Deploy and scale applications using cloud infrastructure.\n\n4. Resources: MDN Web Docs, FreeCodeCamp, Roadmap.sh",
        "ai": "1. Career Suggestion: Machine Learning Engineer\n\n2. Required Skills:\n- Mathematics: Linear Algebra, Calculus, Statistics\n- Programming: Python, C++\n- Frameworks: PyTorch, TensorFlow, Scikit-Learn\n\n3. Step-by-Step Roadmap:\n- Step 1: Build a strong foundation in statistics and linear algebra.\n- Step 2: Learn data manipulation with Pandas and NumPy.\n- Step 3: Implement core ML algorithms from scratch to understand internals.\n- Step 4: Specialize in Deep Learning, NLP, or Computer Vision.\n\n4. Resources: Coursera (Andrew Ng), Fast.ai, Kaggle",
        "design": "1. Career Suggestion: UI/UX Designer + Creative Technologist\n\n2. Required Skills:\n- Design: Figma, Adobe Creative Suite\n- Coding: HTML/CSS, Framer Motion, GSAP\n- UX: User Research, Wireframing, Prototypes\n\n3. Step-by-Step Roadmap:\n- Step 1: Master UI design principles like typography and grid systems.\n- Step 2: Learn user-centric design research and prototyping in Figma.\n- Step 3: Bridge the gap with frontend code for micro-animations.\n- Step 4: Build a high-performance portfolio with creative interactions.\n\n4. Resources: Behance, Dribbble, component.gallery"
      };

      const msgLower = (req.body.message || "").toLowerCase();
      let selectedReply = "1. Career Suggestion: Persistent Architectural Growth\n\n2. Required Skills: Continuous Learning, Adaptability, Core Technical Principles\n\n3. Step-by-Step Roadmap:\n- 1. Maintain current persistence metrics.\n- 2. Explore vocational engineering hubs.\n- 3. Build architectural depth in your niche.\n\n4. Resources: SkillExa Library, GitHub, StackOverflow";

      if (msgLower.includes("full stack") || msgLower.includes("developer")) selectedReply = fallbackReplies["full stack"];
      else if (msgLower.includes("ai") || msgLower.includes("machine learning")) selectedReply = fallbackReplies["ai"];
      else if (msgLower.includes("design") || msgLower.includes("code")) selectedReply = fallbackReplies["design"];

      return res.json({ 
        reply: selectedReply + "\n\n(Note: SkillExa is currently running on Architectural Backup Mode due to high demand.)" 
      });
    }

    res.status(500).json({ error: "AI temporarily unavailable" });
  }
});



module.exports = router;
