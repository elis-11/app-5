import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("DB connected!"))
.catch((err)=> console.log("[ERROR] DB Connection failed!", err.message))