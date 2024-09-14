import express from "express"
import dotenv from "dotenv";
import {connectDB} from "./database/db.js";
import userRoutes from "./routes/user.js";
import courseRoutes from "./routes/course.js";
import adminRoutes from "./routes/admin.js";
import razorpay from "razorpay";
import cors from "cors";

dotenv.config({
    path:"./.env"
})
export const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})
const app = express();
const port = process.env.PORT || 5000;
app.use(cors())
app.use(express.json())
app.use("/uploads",express.static("uploads"))
app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.use("/api",userRoutes);
app.use("/api",courseRoutes);
app.use("/api",adminRoutes);
connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`Server running on port:${port}`);    
    })
}).catch((error)=>{
    console.log("Database connection failed:",error);
})

