import express from "express";
import {
  getPosts,
  createPosts,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPosts);
router.put("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.put("/:id/likePost", auth, likePost);

export default router;
