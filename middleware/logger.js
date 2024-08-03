const COLORS = {
  GET: 'green',
  POST: 'blue',
  PUT: 'yellow',
  DELETE: 'red'
}
const logger = (req, res, next) => {
  const color = COLORS[req.method] || 'white'
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`[color]
  );
  next();
};

export default logger;
