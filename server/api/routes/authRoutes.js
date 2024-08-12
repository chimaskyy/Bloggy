const express = require("express");
const { signupUser, signinUser, logoutUser } = require("../controllers/authController");

const auth = express.Router();

auth.post("/signup", signupUser);
auth.post("/login", signinUser);
auth.post("/logout", logoutUser);

// auth.post("/login", async (req, res, next) => {
//   // Passport middleware for authentication, using the "login" strategy
//   passport.authenticate("login", async (err, user, info) => {
//     try {
//       if (err) {
//         // if err Forward the error to the next middleware
//         return next(err);
//       }
//       if (!user) {
//         const error = new Error("Username or password is incorrect");
//         return next(error);
//       }
//       // Log in the user and generate a token
//       req.login(user, { session: false }, async (error) => {
//         if (error) return next(error);
//         // Prepare the JWT payload with user data
//         const body = { _id: user._id, email: user.email };

//         // Generate JWT token with user data and secret key
//         const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
//           expiresIn: "1h", // Set token to expire in 1 hour
//         });

//         // Send the JWT token in the response
//         return res.json({ token });
//       });
//     } catch (error) {
//       return next(error);
//     }
//   })(req, res, next);
// });

// // protedted Route to get all users, only accessible to admin only
// auth.get('/all', async (req, res, next) => {
//   // Get all users from the database
//   try {
//     const users = await UserModel.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: "An error occurred while fetching users" });
//   }
// });

module.exports = auth;
