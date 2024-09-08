import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
export const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({
                message: "Please login first"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded._id);
        next();
    } catch (error) {
        res.status(500).json({
            message: error.name === "JsonWebTokenError" ? "Invalid token" : "Login first"
        })
    }
};

export const isAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(401).json({
                message: "You are not authorized to perform this action"
            })
        }
        next()
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}