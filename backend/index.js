import express from "express";
import connectDB from "./db/connectDB.js";
import urlRoute from "./routes/url.js";
import cors from "cors"

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/url", urlRoute);

app.listen(8001, ()=>{
    console.log("Server Connected Succesfully..");
})

