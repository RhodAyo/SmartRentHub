const express = require("express");

const ownersRouter = express.Router();

ownersRouter.get("/", (req, res) => {
  res.render("houses", { houses });
});

ownersRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const book = houses.find((house) => house.id == id);

  if (index == -1) {
    res.status(404).end("Property not found");
    return;
  }

  res.json(book);
});

ownersRouter.post("/", (req, res) => {
  const property = req.body;
  houses.push(property);
  res.json(property);
});

ownersRouter.put("/:id", (req, res) => {
  const id = req.params.id;
  const property = req.property;
  const index = houses.findIndex((house) => house.id == id);

  if (index == -1) {
    res.status(404).end("Property not found");
    return;
  }

  houses[index] = house;
  res.json(house);
});

ownersRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  const index = houses.findIndex((house) => house.id == id);
  if (index == -1) {
    res.status(404).end("Property not found");
    return;
  }

  houses.splice(index, 1);
  res.json(houses);
});

module.exports = ownersRouter;
