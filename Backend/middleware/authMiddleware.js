    const jwt = require('jsonwebtoken');
    require('dotenv').config();

    const jwtSecret = process.env.JWT_SECRET;

    exports.authenticateToken = (req, res, next) => {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];

      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }

      jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
          return res.status(403).json({ message: 'Invalid token' });
        }

        req.user = user;
        next();
      });
    };

    exports.authorizeAdmin = (req, res, next) => {
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Unauthorized: Admin access required' });
      }
      next();
    };
    