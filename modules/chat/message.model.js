const mongoose = require("mongoose");
const attachmentType = require("../utils/attachment_type");
const messageType = require("../utils/message_type");
const attachmentSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: attachmentType,
      required: true,
    },
    fileName: {
      type: String,
      trim: true,
    },
    mimeType: {
      type: String,
      trim: true,
    },
    size: {
      type: Number,
      min: 0,
    },
    width: Number,
    height: Number,
    duration: Number,
    thumbnail: String,
  },
  { _id: false }
);

const messageSchema = new mongoose.Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
      index: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    text: {
      type: String,
      trim: true,
      default: "",
    },

    messageType: {
      type: String,
      enum:messageType,
      default: "text",
    },

    attachments: {
      type: [attachmentSchema],
      default: [],
    },

    replyTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },

    forwardedFrom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },

        deliveredAt: {
          type: Date,
          default: Date.now,
        },
    


        seenAt: {
          type: Date,
          default: Date.now,
        },


    edited: {
      type: Boolean,
      default: false,
    },

    editedAt: {
      type: Date,
      default: null,
    },


    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.path("text").validate(function (value="") {//null safeity
  return value.trim().length > 0 || this.attachments.length > 0;
}, "Message must contain text or an attachment.");

messageSchema.index({ conversation: 1, createdAt: -1 });

module.exports = mongoose.model("Message", messageSchema);