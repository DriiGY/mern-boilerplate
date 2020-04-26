const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const config = require("./config/key");
//User model temp
const { User } = require("./models/User");

app.use(cors());
app.use(express.json());
app.use(cookieParser());

//connect to db
const mongoose = require("mongoose");
const connect = mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

//routes
app.use("/api/users", require("./routes/users"));

const port = 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
