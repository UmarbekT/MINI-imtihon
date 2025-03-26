const postModel = require("../models/post.model");

const owner = async (req, res, next) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You do not have permission to modify this post" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = owner;
