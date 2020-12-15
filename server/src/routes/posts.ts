import express from "express";

import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  likePost,
  deletePost
} from "../imports";

const router = express.Router();


router.get("/", getPosts);
router.get("/:id", getPost);
router.get("/", createPost);

router.patch("/:id", updatePost);
router.patch("/:id/likePost", likePost);

router.delete("/:id", deletePost);

export default router;