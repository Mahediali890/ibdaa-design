/**
 * Global Error Handler Middleware
 */

const errorHandler = (err, req, res, next) => {
  // Log error without leaking to client
  console.error('Server error:', err.message);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
  }

  if (err.name === 'SyntaxError' && err.status === 400) {
    statusCode = 400;
    message = 'Invalid JSON in request body';
  }

  const isProduction = process.env.NODE_ENV === 'production';

  res.status(statusCode).json({
    success: false,
    error: isProduction ? 'Something went wrong. Please try again.' : message,
  });
};

module.exports = errorHandler;
