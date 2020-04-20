const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");
////////////////////////////////////
//
//          USER
//
////////////////////////////////////

router.get("/users", auth, (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(400).json({ err });
    return res.status(200).json(users);
  });
});

router.post("/register", (req, res) => {
  const newUser = new User(req.body);
  newUser.save((err, user) => {
    if (err) return res.status(400).json({ registerSucess: false, err });
    return res.status(200).json({ registerSucess: true });
  });
});

router.post("/login", (req, res) => {
  //find email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.status(400).json({
        loginSucess: false,
        message: "Auth failed, email not found!",
      });
    //compare password
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        //if no password matches
        return res.status(400).json({
          loginSucess: false,
          message: "Invalid Password!",
        });
    });
    //generate token
    user.generateToken((err, user) => {
      if (err) return res.status(400).send(err);
      res
        .cookie("x_auth", user.token)
        .status(200)
        .json({ loginSucess: true, userId: user._id });
    });
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      logoutSuccess: true,
    });
  });
});

//get user
router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    userType: req.user.userType,
    image: req.user.image,
  });
});

module.exports = router;
