const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  // You can customize the payload as needed
  const payload = {
    id: user.id,
    username: user.username,
  };

  // Sign the token with a secret key and set an expiration time
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
  return token;
};

module.exports = generateToken; 