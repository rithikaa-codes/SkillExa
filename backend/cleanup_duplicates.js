const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/User");

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(async () => {
    const users = await User.find({}).sort({ _id: -1 }); // Order by newest first
    const emailMap = new Map();
    const idsToRemove = [];

    for (const user of users) {
      if (!user.email) continue;
      const lowerEmail = user.email.toLowerCase();
      if (emailMap.has(lowerEmail)) {
        idsToRemove.push(user._id);
      } else {
        emailMap.set(lowerEmail, user._id);
      }
    }

    if (idsToRemove.length > 0) {
      const result = await User.deleteMany({ _id: { $in: idsToRemove } });
      console.log(`Removed ${result.deletedCount} duplicate users.`);
    } else {
      console.log("No duplicate users found.");
    }

    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
