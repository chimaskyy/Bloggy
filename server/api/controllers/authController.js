const passport = require("passport");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/Users");
require("dotenv").config();

// Signup function
exports.signupUser = async (req, res, next) => {
  try {
    const { username, email } = req.body;

    // Check if the user already exists based on username or email
    const userExist = await UserModel.findOne({
      $or: [{ username }, { email }],
    });

    if (userExist) {
      return res.status(400).json({
        status: "failed",
        message: "User already exists",
      });
    }

    // Proceed with Passport authentication if the user doesn't exist
    passport.authenticate("signup", { session: false }, (err, user, info) => {
      if (err) return next(err);
      
      if (!user) {
        return res.status(400).json({
          status: "failed",
          message: "Signup failed",
        });
      }

      res.json({
        message: "Signup successful",
        user: req.user,
      });
    })(req, res, next);

  } catch (error) {
    next(error);
  }
};

// Signin function
exports.signinUser = async (req, res, next) => {
  passport.authenticate(
    "login",
    { session: false },
    async (err, user, info) => {
      try {
        if (err) return next(err);
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
            expiresIn: "24h", // Set token to expire in 1 hour
          });

          // Send the JWT token in the response
          return res.json({ token });
        });
      } catch (error) {
        next(error);
      }
    }
  )(req, res, next);
};

exports.logoutUser = (req, res) => {
  res.clearCookie("token"); 
  res.json({ message: "Logout successful" });
};


// // protedted Route to get all users, only accessible to admin only
// auth.get(
//   "/all",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res, next) => {
//     // Get all users from the database
//     try {
//       const users = await UserModel.find();
//       res.json(users);
//     } catch (error) {
//       res.status(500).json({ error: "An error occurred while fetching users" });
//     }
//   }
// );
