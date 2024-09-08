import express from "express"
import dotenv from "dotenv";
import {connectDB} from "./database/db.js";
import userRoutes from "./routes/user.js";
import courseRoutes from "./routes/course.js";
import adminRoutes from "./routes/admin.js";


dotenv.config({
    path:"./.env"
})
const app = express();
const port = process.env.PORT || 5000;

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

