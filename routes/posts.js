import express from "express";
const router = express.Router();
import {getPosts, getPostById, createPost, updatePost, deletePost} from '../controllers/postController.mjs'

// Get all posts
router.get("/", getPosts);

// Get single posts
router.get("/:id", getPostById);

// Post data
router.post("/", createPost);

// Update Post
router.put("/", updatePost);

// Delete Post
router.delete("/", deletePost);

export default router;
