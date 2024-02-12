const express = require("express");

const ownersRouter = express.Router();
const user = require("./../models/User");
const passHash = require("bcrypt");

ownersRouter.post("/signup", (req, res) => {
  let { name, email, password, dateOfBirth } = req.body;
  name = name.trim();
  email = email.trim();
  password = password.trim();
  dateOfBirth = dateOfBirth.trim();

  //check to see if the fields are empty
  if (name == "" || email == "" || password == "" || dateOfBirth == "") {
    res.json({
      status: "Fail to signup",
      message: "Empty input fields",
    });
  } else if (!/^[a-zA-Z ]*$/.test(name)) {
    res.json({
      status: "Failed",
      message: "Invalid name entered",
    });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.json({
      status: "Failed",
      message: "Invalid email entered",
    });
  } else if (!new Date(dateOfBirth).getTime()) {
    res.json({
      status: "Failed",
      message: "Invalid date of birth entered",
    });
  } else if (password.length < 10) {
    res.json({
      status: "Failed",
      message: "Password should be between length of 10 -20",
    });
  } else {
    user
      .find({ email })
      .then((result) => {
        if (result.length) {
          res.json({
            status: "Failed",
            message: "User exists already",
          });
        } else {
          //paswword hashing
          const saltRounds = 10;
          passHash
            .hash(password, saltRounds)
            .then((encryptedPass) => {
              const newUser = new user({
                name,
                email,
                password: encryptedPass,
                dateOfBirth,
              });
              newUser
                .save()
                .then((result) => {
                  res.json({
                    status: "Success",
                    message: "Signup Successful!",
                    data: result,
                  });
                })
                .catch((err) => {
                  console.log(err);
                  res.json({
                    status: "Failed",
                    message: "Failed to Signup!",
                  });
                });
            })
            .catch((err) => {
              console.log(err);
              res.json({
                status: "Failed",
                message: "Error in encrypting password.",
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: "Failed",
          message: "Error in checking for existing user",
        });
      });
  }
});
ownersRouter.post("/signin", (req, res) => {
  let { email, password } = req.body;
  email = email.trim();
  password = password.trim();

  if (email == "" || password == "") {
    res.json({
      status: "Failed",
      message: "No credentials supplied",
    });
  } else {
    user
      .find({ email })
      .then((data) => {
        if (data.length) {
          const encryptPass = data[0].password;
          passHash
            .compare(password, encryptPass)
            .then((result) => {
              if (result) {
                res.json({
                  status: "Success!",
                  message: "signed in succesfully!.",
                  data: data,
                });
              } else {
                res.json({
                  status: "Failed",
                  message: "Invalid Password inputted",
                });
              }
            })
            .catch((err) => {
              res.json({
                status: "Failed",
                message: "Error occured in comparing passwords",
              });
            });
        } else {
          res.json({
            status: "Failed",
            message: "Invalid credentials entered",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: "Failed",
          message: "Error occured while checking for existing users",
        });
      });
  }
});
// ownersRouter.put("/:id", (req, res) => {
//   const id = req.params.id;
//   const property = req.property;
//   const index = houses.findIndex((house) => house.id == id);

//   if (index == -1) {
//     res.status(404).end("Property not found");
//     return;
//   }

//   houses[index] = house;
//   res.json(house);
// });

// ownersRouter.delete("/:id", (req, res) => {
//   const id = req.params.id;
//   const index = houses.findIndex((house) => house.id == id);
//   if (index == -1) {
//     res.status(404).end("Property not found");
//     return;
//   }

//   houses.splice(index, 1);
//   res.json(houses);
// });

module.exports = ownersRouter;
