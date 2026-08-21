const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
      trim: true,
    },

    initials: {
      type: String,
      required: true,
      trim: true,
      maxlength: 3,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    preview: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Open", "Waiting", "Resolved"],
      default: "Open",
    },

    channel: {
      type: String,
      enum: ["Email", "Chat"],
      default: "Email",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Conversation", conversationSchema);