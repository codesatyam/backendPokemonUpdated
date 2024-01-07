import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  const isDevelopment = process.env.NODE_ENV === "development";

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 60 * 1000,
      sameSite: isDevelopment ? "lax" : "none",
      secure: !isDevelopment,
    })
    .json({
      success: true,
      message,
      udata: user,
    });
};
