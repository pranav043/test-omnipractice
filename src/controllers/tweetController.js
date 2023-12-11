const User = require("../models/userModel");
const Tweet = require("../models/tweetModel");
const ObjectId = require("mongoose").Types.ObjectId;

const postTweet = async (req, res, next) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res
        .status(400)
        .json({ message: "Message field is missing value!" });
    }

    const userId = req.session.userId;

    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    const tweet = new Tweet({ userId: userId, message });
    await tweet.save();

    res.status(201).json({ message: "Tweeted successfully" });
  } catch (error) {
    next(error);
  }
};

const getFeed = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);
    const followedUsers = user.following || [];

    const feed = await Tweet.find({
      $or: [{ userId: req.session.userId }, { userId: { $in: followedUsers } }],
    })
      .sort({ createdAt: -1 })
      // .populate("userId")  //* If we want to populate userId with user data along with tweets, uncomment this line
      .exec();

    res.json({ feed });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postTweet,
  getFeed,
};
