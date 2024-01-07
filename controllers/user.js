import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";
import { json } from "express";
import { AccessControl } from "../models/accessController.js";
export const login = async (req, res, next) => {
  try {
    const { email, password, fronturl } = req.body;
    // const protocol = req.protocol;
    // const host = req.hostname;
    // // const url = req.originalUrl;
    // const port = process.env.PORT || PORT;

    // const fullUrl = `${protocol}://${host}:${port}`
    // console.log(fronturl);
    // const access= await  AccessControl.findOne({fronturl});
    // if(!access)
    // return next(new ErrorHandler("Access denied", 400));
    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 400));

    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password, Cpassword } = req.body;
    // console.log(password);
    if (!name || !email || !password || !Cpassword)
      return next(new ErrorHandler("Fill all fields", 400));
    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User Already Exist", 400));
    if (Cpassword != password)
      return next(new ErrorHandler("Confirm Password does not match", 400));
    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });

    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Develpoment" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Develpoment" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};
export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();
    // console.log(users);
    res.status(200).json({
      success: true,
      users,
    });
  } catch (e) {
    next(e);
  }
};

// export const restrictAccess = (req, res, next) => {
//   if (!req.user || !req.user.isAdmin) {
//     return res.status(403).json({ error: "Access denied." });
//   }
//   next();
// };

// // Apply the middleware to a specific URL or route
// app.get("/restricted-url", restrictAccess, (req, res) => {
//   // This code will only execute if the access restriction passes
//   res.send("Access granted to restricted URL!");
// });
