const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

// Initialize passport strategies
require('./config/passport');

// Routes
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/event');
const qrRoutes = require('./routes/qrRoutes');

const app = express();

// Core middleware
app.use(express.json());

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// Session (keep secure: true only under HTTPS / trust proxy on Vercel)
app.set('trust proxy', 1);
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'fallback_secret_key_here',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/qr', qrRoutes);

// Google OAuth flows (unchanged)
app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get(
  '/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

module.exports = app;


