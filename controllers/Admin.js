import {AccessControl} from "../models/accessController.js";
import ErrorHandler from "../middlewares/error.js";

export const accessController = async (req, res, next) => {
    try {
      const { front} = req.body;
      const frontend = await AccessControl.create({ fronturl:front});
      res.status(201).json({
        success: true,
        message: "Permission granted Successfully",
      });
    } catch (error) {
      // console.log(error);
      return next(new ErrorHandler("somethig went wrong", 400));
    }
  };
  