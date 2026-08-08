const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    participants: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      ],
      validate: {
        validator: (value) => value.length === 2,
        message: "Conversation must have exactly two participants.",
      },
    },

    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },

    unreadCounts: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        count: {
          type: Number,
          default: 0,
          min: 0,
        },
      },
    ],



    deletedFor: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    
  },
  {
    timestamps: true,
  }
);

conversationSchema.index({ participants: 1, updatedAt: -1 });

module.exports = mongoose.model("Conversation", conversationSchema);