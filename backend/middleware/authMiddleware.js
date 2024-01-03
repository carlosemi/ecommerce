import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';
import e from 'express';

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check for token in cookies
    token = req.cookies.jwt;

    // Make sure token exists
    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-password');
        next();
    } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error('Not authorized, token failed');
    }
});

// Admin middleware
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};

export {protect, admin};