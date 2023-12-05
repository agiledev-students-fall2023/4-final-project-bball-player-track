const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User.js");

const { body, validationResult } = require('express-validator');

const authenticationRouter = () => {
  const router = express.Router();

  router.post("/",
    body('username').isLength({ min: 4, max: 20 }),
    body('password').isLength({ min: 4, max: 20 }),

    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
          message: "Try again. Username and password must be between 4 and 20 characters."
        });
      }
      const { username, password } = req.body;

      try {
        let user = await User.findOne({ username }).exec();

        if (user) {
          if (user.validPassword(password)) {
            console.log("User logged in successfully.");
            const token = user.generateJWT();
            res.json({
              success: true,
              message: "User logged in successfully.",
              token,
              username: user.username,
            });
          } else {
            console.error("Incorrect password.");
            res.status(401).json({
              success: false,
              message: "Incorrect password.",
            });
          }
        } else {
          user = await new User({ username, password }).save();
          console.log(`New user created: ${user}`);
          const token = user.generateJWT();
          res.status(201).json({
            success: true,
            message: "New user created successfully.",
            token,
            username: user.username,
          });
        }
      } catch (err) {
        console.error(`Authentication failed: ${err}`);
        res.status(500).json({
          success: false,
          message: "Error with user authentication.",
          error: err,
        });
      }
    });

  return router;
};

module.exports = authenticationRouter;
