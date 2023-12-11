const bcrypt = require("bcrypt");
const ObjectId = require("mongoose").Types.ObjectId;
const User = require("../models/userModel");

const signUp = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Please share username & password" });
    }

    const userCheck = await User.findOne({ username });
    if (userCheck) {
      return res
        .status(409)
        .json({ message: "User with same username already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      followers: [],
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select("+password").exec();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.session.userId = user._id;
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const followUser = async (req, res, next) => {
  try {
    const { userIdToFollow } = req.body;

    if (!ObjectId.isValid(userIdToFollow)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    if (userIdToFollow === req.session.userId) {
      return res.status(400).json({ message: "Cannot follow yourself" });
    }

    const [userToFollowResult, currentUserResult] = await Promise.allSettled([
      User.findById(userIdToFollow),
      User.findById(req.session.userId),
    ]);

    const userToFollow =
      userToFollowResult.status === "fulfilled"
        ? userToFollowResult.value
        : null;
    const currentUser =
      currentUserResult.status === "fulfilled" ? currentUserResult.value : null;

    if (!userToFollow) {
      return res.status(404).json({ message: "User to follow not found" });
    }

    if (!currentUser) {
      return res.status(404).json({ message: "Current user not found" });
    }

    if (
      !currentUser.following ||
      !currentUser.following.includes(userIdToFollow)
    ) {
      currentUser.following = currentUser.following || [];
      currentUser.following.push(userIdToFollow);

      await currentUser.save();

      res.json({ message: "User followed successfully" });
    } else {
      res.json({ message: "User already followed" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp,
  login,
  followUser,
};
