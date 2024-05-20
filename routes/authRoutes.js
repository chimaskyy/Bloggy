const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = express.Router();

auth.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.json({
      message: "Signup successful",
      user: req.user,
    });
  }
);

auth.post("/login", async (req, res, next) => {
  // Passport middleware for authentication, using the "login" strategy
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err) {
        // if err Forward the error to the next middleware
        return next(err);
      }
      if (!user) {
        const error = new Error("Username or password is incorrect");
        return next(error);
      }
      // Log in the user and generate a token
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        // Prepare the JWT payload with user data
        const body = { _id: user._id, email: user.email };

        // Generate JWT token with user data and secret key
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
          expiresIn: "1h", // Set token to expire in 1 hour
        });

        // Send the JWT token in the response
        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = auth;
