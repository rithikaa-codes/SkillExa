const express = require("express");
const Career = require("../models/Career");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const careers = await Career.find({}, "title");
    res.json(careers);
  } catch (error) {
    res.status(500).json({ error: "Fetch-all failure." });
  }
});

router.get("/:title", async (req, res) => {
  try {
    const career = await Career.findOne({ title: new RegExp("^" + req.params.title + "$", "i") });
    if (!career) return res.status(404).json({ error: "Career not found in database." });
    res.json(career);
  } catch (error) {
    res.status(500).json({ error: "Data-sync failure." });
  }
});

module.exports = router;
