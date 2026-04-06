const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/User");

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(async () => {
    const users = await User.find({});
    console.log("Users in DB:", users.map(u => ({ email: u.email, hasName: !!u.name })));
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
