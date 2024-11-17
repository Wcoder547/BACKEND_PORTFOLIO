class ErrorHandler extends Error {
  constructor(message, statuscode) {
    super(message);
    this.statuscode = statuscode;
  }
}

export const errorMiddleWare = (err, req, res, next) => {
  err.message = err.message || "internal server error";
  err.statuscode = err.statuscode || 500;

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Extended!!`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "JsonWebTokenError") {
    const message = `Json WebToken is invalid Try again !`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "TokenExpiredError") {
    const message = `JSON web token is Expired Try to Login !`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "CastError") {
    const message = `invalid  ${err.path} !`;
    err = new ErrorHandler(message, 400);
  }
  console.log(err);
  const errorMessage = err.errors
    ? Object.values(err.errors)
        .map((error) => error.message)
        .join(" ")
    : err.message;

  return res.status(err.statuscode).json({
    success: false,
    message: errorMessage,
  });
};

export default ErrorHandler;
