const jwt = require('jsonwebtoken');
const jwtSecret = require('./config');

// Middleware function to verify JWT
function verifyToken(req, res, next) {
  // Get the JWT token from the request headers, query parameters, or cookies
  const authHeader = req.headers["authorization"];

  // Check if token exists
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  // Verify the token
  const token = authHeader.split(' ')[1];  
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    } else {
      // If token is valid, save decoded token payload to request object
      if (decoded.userId) {
        req.userId = decoded.userId;
        next();
      } else {
        return res.status(403).json({});
      }
    }
  });
}

module.exports = verifyToken;
