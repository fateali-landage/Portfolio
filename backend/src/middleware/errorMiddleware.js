export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  let message = err.message

  // Handle Mongoose Bad Object ID (CastError)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 400
    message = `Invalid ID format: ${err.value}`
  }

  // Handle Mongoose duplicate key error (11000)
  if (err.code === 11000) {
    statusCode = 400
    const field = Object.keys(err.keyValue || {})[0]
    message = `Duplicate field value entered for: ${field || 'unknown'}`
  }

  // Handle Mongoose Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400
    message = Object.values(err.errors).map(val => val.message).join(', ')
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}
