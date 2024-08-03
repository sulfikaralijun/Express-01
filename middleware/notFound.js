const notFound = (req, res, next) => {
  const err = new Error("Endpoint not found");
  err.status = 404;
  next(err);
};

export default notFound;
