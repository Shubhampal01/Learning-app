import express from "express"
import dotenv from "dotenv";
import {connectDB} from "./database/db.js";
import userRoutes from "./routes/user.js";

dotenv.config({
    path:"./.env"
})
const app = express();
const port = process.env.PORT || 5000;

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.use("/api",userRoutes);
app.listen(port,()=>{
    console.log(`Server running on port:${port}`);
})
