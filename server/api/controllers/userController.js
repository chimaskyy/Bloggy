const UserModel = require("../models/Users");

// Get all users
exports.getUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res
        .status(200)
        .json({ status: "success", numUsers: users.length, data: users, });
  } catch (error) {
    next(error);
    res
        .status(500)
        .json({ status: "failed", message: error.message });
  }
}

//get user by id
exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id)
    .populate("posts")
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res
        .status(200)
        .json({ status: "success", data: user });
    } catch (error) {
      next(error);
      res
          .status(500)
          .json({ status: "failed", message: error.message });
    }
}
