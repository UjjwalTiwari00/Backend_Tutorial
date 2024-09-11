const bcrypt = require("bcrypt"); // Import bcrypt
const Register = require("../models/model");
const jwt = require("jsonwebtoken");
exports.SignupPost = async (req, res) => {
  try {
    const { name, password, email, role } = req.body;

    // Check if the user already exists
    const existingUser = await Register.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password
    let HashedPassword;
    try {
      HashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      console.error("Error hashing password:", error);
      return res.status(500).json({
        success: false,
        message: "Error while hashing password",
      });
    }

    // Create a new user registration
    const Registration = new Register({
      name,
      password: HashedPassword,
      email,
      role,
    });

    // Save the user to the database
    await Registration.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: Registration,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "please fill all the detail",
      });
    }

    let user = await Register.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user is not registerd",
      });
    }
    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };
    // verify password & generate a JWT token
    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: "2h",
      });

      console.log(user);

      user.token = token;
      let hashPassword = user.password;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("babbarCookie", token, options).status(200).json({
        success: true,
        token,
        user,
        // hashPassword,
        message: "user login in successfully",
      });
    } else {
      return res
        .status(403)
        .json({ success: false, message: "password incorrect" });
    }
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
