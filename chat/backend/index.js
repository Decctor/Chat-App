const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());
require("dotenv").config();
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database foi conectado com sucesso");
});

const chatRouter = require("./routes/chat");
const userRouter = require("./routes/user");
app.use("/chat", chatRouter);
app.use("/user", userRouter);
app.listen(3001, () => console.log("server on"));
