const mongoose = require("mongoose");

const TweetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
TweetSchema.index({ userId: 1 });

module.exports = mongoose.model("Tweet", TweetSchema);
