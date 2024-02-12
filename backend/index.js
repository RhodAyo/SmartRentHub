const collection = require("./config/db");
const model = require("./models/User");

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const bodyParser = require("express").json;
const ownersRouter = require("./routes/owners");
const propRouter = require("./routes/properties");
const views = path.join(__dirname, "./../frontend");
// app.use(express.static("public"))
app.use(bodyParser());
// app.set('view engine', 'ejs');
app.use("/user", ownersRouter);
app.use("/property", propRouter);

// app.get("/", (req, res) => {
//   res.status(200);
//   res.send("Hello World");
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
