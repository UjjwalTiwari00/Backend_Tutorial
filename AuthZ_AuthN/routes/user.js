const express = require("express");
const router = express.Router();

const { SignupPost } = require("../controllers/user");
const { login } = require("../controllers/user");

const { auth } = require("../middlewares/auth");

const { StudentAuth } = require("../middlewares/auth");
const { AdminAuth } = require("../middlewares/auth");

//normal routes
router.post("/signup", SignupPost);
router.post("/login", login);
// protected routes
router.get("/user", auth, (req, res) => {
  res.json({
    success: true,
    message: "welcome to the dashboard",
  });
});
router.get("/students", auth, StudentAuth, (req, res) => {
  res.json({
    success: true,
    message: "welcome to the protected route for students",
  });
  console.log(req.user);
});
router.get("/admin", auth, AdminAuth, (req, res) => {
  res.json({
    success: true,
    message: "welcome to the protected route for Admin",
  });
  console.log(req.user);
});
module.exports = router;
