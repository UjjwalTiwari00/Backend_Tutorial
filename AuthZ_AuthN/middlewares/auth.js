const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  const token = req.body.token;
  try {
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.SECRET);
      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (e) {
    return res.status(401).json({
      success: false,
      message: "token is invalid",
    });
  }
};

exports.StudentAuth = async (req, res, next) => {
  try {
    if (req.user.role !== "Students") {
      return res.status(401).json({
        success: false,
        message: "THis is a protected route for students",
      });
    }
    console.log(req.user);
    
    next();
  } catch (e) {
    return res.status(401).json({
      success: false,
      message: "token is invalid",
    });
  }
};

exports.AdminAuth = async (req, res, next) => {
  try{
    if(req.user.role !== "admin") {
        return res.status(401).json({
            success:false,
            message:'THis is a protected route for admin',
        });
    }
    next();
}
catch(error) {
return res.status(500).json({
    success:false,
    message:'User Role is not matching',
})
}
};
