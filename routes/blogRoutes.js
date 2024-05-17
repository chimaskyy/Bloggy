// routes/blogRoutes.js

const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const authMiddleware = require("../middlewares/auth");

// Create Blog
router.post("/post", authMiddleware.isAuthenticated, blogController.createBlog);

// Update Blog State
router.put(
  "/post/:id/state",
  authMiddleware.isAuthenticated,
  authMiddleware.isBlogOwner,
  blogController.updateBlogState
);

// Edit Blog
router.put(
  "/post/:id",
  authMiddleware.isAuthenticated,
  authMiddleware.isBlogOwner,
  blogController.editBlog
);

// Delete Blog
router.delete(
  "/post/:id",
  authMiddleware.isAuthenticated,
  authMiddleware.isBlogOwner,
  blogController.deleteBlog
);

// Get Blog List
router.get("/post", blogController.getBlogList);

// Get Single Blog
router.get("/post/:id", blogController.getSingleBlog);

// Get User Blogs
router.get(
  "/user",
  authMiddleware.isAuthenticated,
  blogController.getUserBlogs
);

module.exports = router;
