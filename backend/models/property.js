const mongoose = require("mongoose");
const schema = mongoose.Schema;

const propertySchema = new schema({
  id: { type: Number },
  name: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
});

const property = mongoose.model("properties", propertySchema);
module.exports = property;
