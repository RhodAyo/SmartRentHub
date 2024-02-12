require("dotenv").config();
const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;

// function connectSRHToMongoDB() {
mongoose
  .connect(
    "mongodb+srv://rhodayo10:MongoDbPassword.@cluster0.y2noy2g.mongodb.net/Smartrenthub"
  )
  .then(() => {
    console.log("Connected to MongoDB successfully");
  });
//   mongoose.connection.on("connected", () => {
//     console.log("Connected to MongoDB successfully");
//   });

//   mongoose.connection.on("error", (err) => {
//     console.log("Error Connecting to MongoDB, ", err);
//   });
// }

// module.exports = { connectSRHToMongoDB };
