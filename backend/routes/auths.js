import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();
const secretKey = process.env.JWT_SECRET || '5DD4BmEnTYNB9Qcn';

// Main function that exports the router
export default (db) => {

  // Register request
  router.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const existingUser = await db('users').where({ email }).first();
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered. Try login' });
      }
      const passwordHash = await bcrypt.hash(password, 10);

      const [userId] = await db('users').insert({
        name,
        email,
        password_hash: passwordHash,
        image: '', // Optionally handle profile image
        email_verified: false,
        is_admin: false,
      }).returning('id');

      res.status(201).json({ success: true, id: userId.id });
    } catch (error) {
      console.error('Error trying to register user:', error);
      res.status(500).json({ error: 'Failed to register user' });
    }
  });

  // Login route
  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await db('users').where({ email }).first();
      if (!user) {
        return res.status(400).json({ message: 'Email wasn\'t found in our database. Try register' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

      res.json({ token, name: user.name });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Middleware to authenticate JWT
  const authenticateJWT = (db) => async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (token) {
      try {
        jwt.verify(token, secretKey, async (err, decoded) => {
          if (err) {
            return res.sendStatus(403); // Forbidden
          }

          // Fetch user from the database
          const user = await db('users').where({ id: decoded.userId }).first();

          if (!user) {
            return res.sendStatus(404); // Not Found
          }

          // Attach user data to the request
          req.user = {name: user.name, email: user.email};
          next();
        });
      } catch (error) {
        console.error('Error verifying token:', error);
        res.sendStatus(500); // Internal Server Error
      }
    } else {
      res.sendStatus(401); // Unauthorized
    }
  };

  // Secure data route
  router.get('/secure-data', authenticateJWT(db), (req, res) => {
    res.json({ user: req.user, data: 'This is secure data' });
  });

  return router;
};
