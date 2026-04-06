const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "SkillExa_Exclusive_TopSecret_2026_Legacy";

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: "Access Denied: No Token Provided" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Access Denied: Invalid Token" });
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken, JWT_SECRET };
