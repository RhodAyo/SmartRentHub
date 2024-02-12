const express = require("express");

const propRouter = express.Router();
const property = require("./../models/property");

propRouter.post("/addproperty", (req, res) => {
  let { id, name, location, price, category, description } = req.body;
  id = id;
  name = name.trim();
  location = location.trim();
  price = price.trim();
  category = category.trim();
  description = description.trim();

  //check to see if the fields are empty
  if (
    id == "" ||
    name == "" ||
    location == "" ||
    price == "" ||
    category == "" ||
    description == ""
  ) {
    res.json({
      status: "Failed to post property",
      message: "Empty input fields",
    });
  } else if (!/[^A-Za-z0-9]+/.test(name)) {
    res.json({
      status: "Failed",
      message: "Invalid name of property entered",
    });
  } else {
    property
      .find({ name })
      .then((result) => {
        if (result.length) {
          res.json({
            status: "Failed",
            message: "Property exists already",
          });
        } else {
          const newProperty = new property({
            id,
            name,
            location,
            price,
            category,
            description,
          });
          newProperty
            .save()
            .then((result) => {
              res.json({
                status: "Success",
                message: "Property added Successfully!",
                data: result,
              });
            })
            .catch((err) => {
              console.log(err);
              res.json({
                status: "Failed",
                message: "Failed to add property!",
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: "Failed",
          message: "Error in checking for existing property",
        });
      });
  }
});

module.exports = propRouter;
