const mongoose = require("mongoose");

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { retryWrites: false });
    console.log("Connected to Database");
  } catch (err) {
    console.log("Connection Failed! ", err);
  }
};
module.exports = connectMongo;
