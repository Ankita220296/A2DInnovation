const mongoose = require("mongoose");

//................................. Create post schema .........................//
const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: {
      // ObjectId is used to reference userModel
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    authorName: {
      type: String,
      required: true,
      trim: true,
    },
    bookPrice: {
      type: Number,
      required: true,
    },
    totalIssued: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    deletedAt: {
      type: Date,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
