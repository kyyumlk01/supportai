const express = require("express");

const Conversation = require("../models/Conversation");
const auth = require("../middleware/auth");

const router = express.Router();

// Create a conversation
router.post("/", auth, async (req, res) => {
  try {
    const {
      customer,
      initials,
      subject,
      preview,
      status,
      channel,
    } = req.body;

    if (!customer || !initials || !subject || !preview) {
      return res.status(400).json({
        success: false,
        message: "Customer, initials, subject, and preview are required",
      });
    }

    const conversation = await Conversation.create({
      customer,
      initials,
      subject,
      preview,
      status: status || "Open",
      channel: channel || "Email",
      user: req.userId,
    });

    return res.status(201).json({
      success: true,
      conversation,
    });
  } catch (error) {
    console.error("Failed to create conversation:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create conversation",
    });
  }
});

// Get all conversations
router.get("/", auth, async (req, res) => {
  try {
    const conversations = await Conversation.find({
      user: req.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      conversations,
    });
  } catch (error) {
    console.error("Failed to fetch conversations:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch conversations",
    });
  }
});

// Get single conversation
router.get("/:id", auth, async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    return res.status(200).json({
      success: true,
      conversation,
    });
  } catch (error) {
    console.error("Failed to fetch conversation:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch conversation",
    });
  }
});

// Update conversation
router.put("/:id", auth, async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = ["Open", "Waiting", "Resolved"];

    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid conversation status",
      });
    }

    const conversation = await Conversation.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.userId,
      },
      {
        ...(status ? { status } : {}),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    return res.status(200).json({
      success: true,
      conversation,
    });
  } catch (error) {
    console.error("Failed to update conversation:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update conversation",
    });
  }
});

module.exports = router;