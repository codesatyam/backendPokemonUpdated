import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  // console.log(req);
  if (!token) 
  return res.status(404).json({
    success: false,
    message: "Login Required",
  });
  //  const token=req.headers.cookie.slice(6);
  // console.log(token);
     

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded._id);
  next();
};


export const authorizeRoles =  (...roles) => {
  return async (req, res, next) => {
    const _id = req.params._id;
    const data = await User.findOne({ _id });
    console.log(data)
    if (!roles.includes(data)) {
      return res.status(404).json({
        success: false,
        message: `Role: ${data} is not allowed to access this resouce `,
      });
      
    }

    next();
  };
};
