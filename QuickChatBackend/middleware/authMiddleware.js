import jwt from 'jsonwebtoken';
import User from '../server/models/user.js'; // Adjust path as needed

const protect = async (req, res, next) => {
  const { authorization } = req.headers;

  // Check if the Authorization header exists
  if (!authorization) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  try {
    // Split the Bearer token
    const token = authorization.split(' ')[1];

    // Verify the token and decode the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by the decoded id, excluding the password
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach the user to req.user
    req.user = user;

    // Call next to proceed
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default protect;
