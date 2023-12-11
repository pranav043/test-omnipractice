require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const errorHandler = require("./util/errorHandler");
const connectMongo = require("./db/connection");

//Config
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(cookieParser());

//Mongo Connection
connectMongo();

//Auth Setup
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
  })
);

//Router File
const routes = require("./routes/router");
app.use("/api", routes);

//Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

//404 catch
app.all("*", (req, res) => {
  res.status(404).json({ error: "Route Not Found!" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
