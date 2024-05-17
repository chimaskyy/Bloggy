const passport = require("passport");
const Blog = require("../models/Blogs");

// Middleware to check if the user is authenticated
exports.isAuthenticated = async (req, res, next) => {
  try {
    const authFunction = passport.authenticate("jwt", { session: false });
    const user = await new Promise((resolve, reject) => {
      authFunction(req, res, (err) => {
        if (err) {
          return reject(err);
        }
        if (!req.user) {
          return reject(new Error("Unauthorized access"));
        }
        resolve(req.user);
      });
    });

    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Unauthorized access") {
      return res.status(401).json({ message: error.message });
    }
    next(error);
  }
};
// Middleware to check if the user is the owner of the blog
exports.isBlogOwner = async (req, res, next) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  if (blog.author.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ message: "You do not have permission to perform this action" });
  }

  next();
};
