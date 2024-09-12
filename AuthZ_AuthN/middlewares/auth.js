const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  //fetcching token from body and after that we cal also fetch it from cookies

  // to yaha pe hota ye hai ki Authorization ke pas ak Bearer token hota ahi to usse call kr rahe ahi aur usko "Bearer " to replace kr rahe hai empty string ke saath
  const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ","")
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
