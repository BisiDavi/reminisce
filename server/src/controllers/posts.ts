import express, { Request, Response } from "express";
import mongoose from "mongoose";

import PostMessage from "../imports";

const router = express.Router();

export const getPosts = async (req: Request, res: Response): Promise<any> => {
  try {
    const postMessages = await PostMessage.find({});
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};

interface IPost {
  title: string;
  message: string;
  selectedFile: string;
  creator: string;
  tags: string[];
}

export const createPost = async (req: Request, res: Response) => {
  const { title, message, selectedFile, creator, tags }: IPost = req.body;

  const newPost = new PostMessage({
    title,
    message,
    selectedFile,
    creator,
    tags
  });

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req: any, res: any): Promise<any> => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags }: IPost = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with idL ${id}`);
  }
  const updatedPost = {
    creator,
    title,
    message,
    tags,
    selectedFile,
    _id: id
  };

  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with id: ${id}`);
  }
  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully" });
};

export const likePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with id: ${id}`);
  }
  const post = await PostMessage.findById(id);

  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  );

  res.json(updatedPost);
};

export default router;
