const postModel = require("../models/post.model");
const asyncHandler = require("../utils/asyncHandler");

const createPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const newPost = await postModel.create({
    title,
    content,
    author: req.user.id,
  });
  res.status(201).json(newPost);
});

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await postModel.find().populate("author", "username email");
  res.json(posts);
});

const getPostById = asyncHandler(async (req, res) => {
  const post = await postModel
    .findById(req.params.id)
    .populate("author", "username email");
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

const updatePost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const updatedPost = await postModel.findByIdAndUpdate(
    req.params.id,
    { title, content },
    { new: true }
  );
  if (!updatedPost) return res.status(404).json({ message: "Post not found" });

  res.json(updatedPost);
});

const deletePost = asyncHandler(async (req, res) => {
  const deletedPost = await postModel.findByIdAndDelete(req.params.id);
  if (!deletedPost) return res.status(404).json({ message: "Post not found" });

  res.json({ message: "Post deleted successfully" });
});

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
