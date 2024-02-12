const express = require("express");

const propRouter = express.Router();
const property = require("./../models/property");
const db = require("./../config/db");

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
propRouter.get("/getAllProperty", async (req, res) => {
  try {
    // const dbase = db.db("Smartrenthub")
    // let id = ObjectID(req.params.id);
    // dbase
    //   .collection("name")
    //   .find()
    //   .toArray((err, results) => {
    //     res.send(results);
    //   });
    const properties = await property.find({});
    if (properties) {
      return res.status(200).json({
        message: "Property successfully retrieved",
        properties,
      });
    } else {
      return res.status(404).json({
        message: "Property not found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Property retrieval failed",
      error,
      route: "/getAllProperty",
    });
  }
});

propRouter.get("/getproperty/:id", async (req, res) => {
  try {
    //let id = ObjectID(req.params.id);
    const properties = await property.findOne({
      id: req.params.id,
    });
    if (!properties) {
      return res.status(404).json({
        message: "Property not found",
      });
    } else {
      return res.status(200).json({
        message: "Property successfully retrieved",
        properties,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Property retrieval failed",
      error,
      route: "/getproperty/:id",
    });
  }
});

propRouter.get("/getcategory/:category", async (req, res) => {
  try {
    const categories = await property.find({
      category: req.params.category,
    });
    if (!categories) {
      return res.status(404).json({
        message: "Category not found",
      });
    } else {
      return res.status(200).json({
        message: `Category ${category} successfully retrieved`,
        categories,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Category retrieval failed",
      error,
      route: "/getcategory/:category",
    });
  }
});
module.exports = propRouter;
