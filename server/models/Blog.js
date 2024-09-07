const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Blog Title is required"],
      minLength: 3,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
  },
  {
    timestamps: true,
  }
);

const BlogModel = mongoose.model("Blog", BlogSchema);
module.exports = BlogModel;
