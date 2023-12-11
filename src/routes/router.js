const express = require("express");
const router = express.Router();
const userRouter = express.Router();
const tweetRouter = express.Router();

const { signUp, login, followUser } = require("../controllers/userController");
const { postTweet, getFeed } = require("../controllers/tweetController");
const authenticateUser = require("../middleware/auth");

userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.post("/follow-user", authenticateUser, followUser);
tweetRouter.post("/post-tweet", authenticateUser, postTweet);
tweetRouter.get("/get-my-feed", authenticateUser, getFeed);

router.use("/user", userRouter);
router.use("/tweet", tweetRouter);

module.exports = router;
