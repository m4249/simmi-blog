const express = require("express");
const router = express.Router();
const Post = require("../models/posts");

// Get all Posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

// Create new Post
router.post("/", async (req, res) => {
  var newPost = new Post({
    title: req.body.title,
    content: req.body.content
  });

  try {
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get specific Post
router.get("/:postID", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postID);
    res.render(__dirname + "/views/post", {
      title: post.title,
      content: post.content
    });
    // res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

// Deleting a Post
router.delete("/:postID", async (req, res) => {
  try {
    const removedPost = await Post.deleteOne({ _id: req.params.postID });
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

// Updating a Post
router.patch("/:postID", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postID },
      { $set: { title: req.body.title } }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
