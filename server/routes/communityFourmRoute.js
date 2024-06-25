const express = require("express");
const router = express.Router();

const {
  createPost,
  createComment,
  fetchPosts,
  getPostComments,
} = require("../controllers/communityForumCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/posts", authMiddleware, createPost);
router.post("/posts/:postId/createComment", authMiddleware, createComment);
router.get("/fetchPosts", fetchPosts);
router.get("/posts/:postId/getComments", authMiddleware, getPostComments);

module.exports = router;
