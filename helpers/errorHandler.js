const errorHandler = (res, err) => {
  console.error(err);
  return res.status(500).json({
    message:
      "There's an error on the server. Please contact the administrator.",
    error: err,
  });
};

module.exports = errorHandler;
