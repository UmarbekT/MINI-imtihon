const express = require("express");
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controller/post.controller");
const authMiddleware = require("../middleware/auth.middleware");
const ownerMiddleware = require("../middleware/owner.middleware");

const router = express.Router();

router.route("/").post(authMiddleware, createPost).get(getAllPosts);
router
  .route("/:id")
  .get(getPostById)
  .put(authMiddleware, ownerMiddleware, updatePost)
  .delete(authMiddleware, ownerMiddleware, deletePost);

module.exports = router;
