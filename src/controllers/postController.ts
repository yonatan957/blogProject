import { Request, Response, NextFunction } from "express";
import Post from "../models/postModel";
import User from "../models/userModel";

// Create a new post
export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findById(req.body.author);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    const newPost = new Post(req.body);
    await newPost.save();
    await User.findByIdAndUpdate(user._id, { $push: { posts: newPost._id } });
    res.status(201).json({ success: true, data: newPost });
  } catch (error:any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a post
export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => { 
  try {
    const id = req.params.id;
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      res.status(404).json({ success: false, message: "Post not found" });
      return;
    }
    await User.findByIdAndUpdate(deletedPost.author, {
      $pull: { posts: deletedPost._id }})
    res.status(204).json({ success: true, data: null });
  } catch (error:any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all posts
export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const posts = await Post.find().populate({
      path: 'author',
      select: 'username email profile'
    }).populate({
      path: 'comments.author',
      select: 'username'
    });
    res.status(200).json({ success: true, data: posts });
  } catch (error:any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get a single post by ID
export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id).populate({
      path: 'author',
      select: 'username email profile'
    }).populate({
      path: 'comments.author',
      select: 'username'
    });

    if (!post) {
      res.status(404).json({ success: false, message: "Post not found" });
      return;
    }

    res.status(200).json({ success: true, data: post });
  } catch (error:any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update a post
export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id;

  try {
    const post = await Post.findByIdAndUpdate(id, { $set: req.body }, {
      new: true,
      runValidators: true
    });

    if (!post) {
      res.status(404).json({ success: false, message: "Post not found" });
      return;
    }

    res.status(200).json({ success: true, data: post });
  } catch (error:any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Add a comment to a post
export const addComment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id;

  try {
    const post = await Post.findByIdAndUpdate(id, {
      $push: { comments: req.body }
    }, {
      new: true,
      runValidators: true
    });

    if (!post) {
      res.status(404).json({ success: false, message: "Post not found" });
      return;
    }

    res.status(200).json({ success: true, data: post });
  } catch (error:any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
