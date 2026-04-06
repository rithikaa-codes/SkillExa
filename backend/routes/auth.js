const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { JWT_SECRET } = require("../middleware/auth");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const email = req.body.email.toLowerCase();
    const { name, password } = req.body;
    
    let user = await User.findOne({ email });
    const hashedPassword = await bcrypt.hash(password, 10);

    if (user) {
      // Identity exists: Perform Synchronization (Update password/name & Login)
      user.password = hashedPassword;
      if (name) user.name = name;
      await user.save();
      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "24h" });
      return res.status(200).json({ message: "Identity Synchronized: Login Successful 🚀", token, user: { name: user.name, email } });
    }

    // New Identity: Initialization
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: "24h" });
    res.status(201).json({ message: "Welcome! Account Created Successfully 🚀", token, user: { name, email } });
  } catch (error) {
    res.status(500).json({ error: "Account initialization interrupted." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email.toLowerCase();
    const { password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "Identifier not found in ecosystem." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Authorization key mismatch." });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "24h" });
    res.json({ message: "Login Successful 🚀", token, user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: "Authorization protocol error." });
  }
});

module.exports = router;
