const errorHandler = (err, req, res, next) => {
  console.log(`Error: ${err.message}`.red);
  if(err.status){
    return res.status(err.status).json({msg: err.message})
  }
  res.status(500).json({msg: err.message})
}

export default errorHandler