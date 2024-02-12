const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  name: { type: String, required: true },
  email: String,
  password: { type: String, required: true },
  category: { type: String, required: true },
  dateOfBirth: Date,
});

const user = mongoose.model("users", userSchema);
module.exports = user;
