const Blog = require("../models/Blogs");
const User = require("../models/Users");

// Utility function to calculate reading time
const calculateReadingTime = (text) => {
  if (!text || text.trim() === "") {
    return "Less than 1 minute"; 
  }

  const wordsPerMinute = 200;
  const wordRegex = /\b\w+\b/g;
  const textLength = text.match(wordRegex).length;
  const minutes = Math.ceil(textLength / wordsPerMinute);
  // const seconds = (minutes * 60) % 60; 

  return `${minutes} minute${minutes === 1 ? "" : "s"} read`;
};

// Create Blog
exports.createBlog = async (req, res, next) => {
  try {
    // Get user ID from the authenticated user
    const userId = req.user._id;
    const username = req.user.username;

    const readingTime = calculateReadingTime(req.body.body);
    // Create the blog with initial state as draft
    const blog = await Blog.create({
      ...req.body,
      author: userId,
      state: "draft",
      read_count: 0,
      reading_time: readingTime,
    });

    // Construct the response with the username
    const response = {
      ...blog.toObject(),
      author: username, // Overwrite the author field with the username
    };

    res.status(201).json({
      count: 1,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

// Update Blog State
exports.updateBlogState = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { state } = req.body;

    // Find the blog by ID and update its state
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { state },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(updatedBlog);
  } catch (error) {
    next(error);
  }
};

// Edit Blog
exports.editBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the blog by ID and update its content
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(updatedBlog);
  } catch (error) {
    next(error);
  }
};

// Delete Blog
exports.deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the blog by ID and delete it
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Get Blog List
exports.getBlogList = async (req, res, next) => {
  try {
    // Pagination logic
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Filtering logic
    const filters = {};
    if (req.query.state) {
      filters.state = req.query.state;
    }
    // still Add more filtering logic for author, title

    // Sorting logic
    const sort = {};
    if (req.query.sortBy) {
      sort[req.query.sortBy] = req.query.order === "desc" ? -1 : 1;
    }

    // Fetch blogs based on filters, pagination, and sorting
    const blogs = await Blog.find(filters)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .populate("author", "first_name last_name");

    // Get the total count of blogs
    const totalBlogs = await Blog.countDocuments(filters);

    res.json({
      count: totalBlogs,
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

// Get Single Blog
exports.getSingleBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the blog by ID and increment read count
    const blog = await Blog.findByIdAndUpdate(
      id,
      { $inc: { read_count: 1 } },
      { new: true }
    ).populate("author", "username");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json({
      count: 1,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

// Get User Blogs
exports.getUserBlogs = async (req, res, next) => {
  try {
    // Get user ID from the authenticated user
    const userId = req.user._id;

    // Fetch blogs created by the user
     const userBlogs = await Blog.find({ author: userId }).populate(
       "author",
       "username"
     );

    res.json({
      count: userBlogs.length,
      data: userBlogs,
    });
  } catch (error) {
    next(error);
  }
};
