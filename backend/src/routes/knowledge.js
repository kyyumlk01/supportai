const express = require("express");

const Knowledge = require("../models/Knowledge");
const auth = require("../middleware/auth");

const router = express.Router();

// Get all knowledge articles
router.get("/", auth, async (req, res) => {
  try {
    const articles = await Knowledge.find({ user: req.userId }).sort({
      updatedAt: -1,
    });

    return res.status(200).json({
      success: true,
      articles,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch knowledge articles",
    });
  }
});

// Create a knowledge article
router.post("/", auth, async (req, res) => {
  try {
    const { title, category, content } = req.body;

    if (!title || !category || !content) {
      return res.status(400).json({
        success: false,
        message: "Title, category, and content are required",
      });
    }

    const article = await Knowledge.create({
      user: req.userId,
      title: title.trim(),
      category: category.trim(),
      content: content.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Knowledge article created successfully",
      article,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create knowledge article",
    });
  }
});

// Update a knowledge article
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, category, content } = req.body;

    if (!title || !category || !content) {
      return res.status(400).json({
        success: false,
        message: "Title, category, and content are required",
      });
    }

    const article = await Knowledge.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.userId,
      },
      {
        title: title.trim(),
        category: category.trim(),
        content: content.trim(),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Knowledge article not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Knowledge article updated successfully",
      article,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update knowledge article",
    });
  }
});

// Delete a knowledge article
router.delete("/:id", auth, async (req, res) => {
  try {
    const article = await Knowledge.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Knowledge article not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Knowledge article deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete knowledge article",
    });
  }
});

module.exports = router;