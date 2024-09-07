require("dotenv").config();
require("express-async-errors");
const express = require("express");
const path = require("path");
const app = express();
var cors = require("cors");
//connectin

const connectDB = require("./db/connect");

app.use("/", express.static(path.join(__dirname, "images")));
app.use(cors());
app.use(express.json());
// routers
const authRouter = require("./routes/auth");
const blogsRouter = require("./routes/blogs");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/blogs", blogsRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
