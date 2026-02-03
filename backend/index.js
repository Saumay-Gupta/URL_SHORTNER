import express from "express";
import connectDB from "./db/connectDB.js";
import cors from "cors"
import dotenv from "dotenv"
import { handleSignUP } from "./controllers/handleSignUP.js";
import { handleLogin } from "./controllers/handleLogin.js";
import { verifyUser } from "./middlewares/verifySession.js";
import { handleOriginalUrl, handleRedirectUrl } from "./controllers/url.js";
import { getAllUrls } from "./controllers/getAllUrls.js";
import cookieParser from "cookie-parser";
import handleDelete from "./controllers/handleDelete.js";

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,      
  })
);
app.use(express.json());

connectDB();

app.post('/signUP', handleSignUP);
app.post('/login', handleLogin);


app.get('/url/all', verifyUser , getAllUrls);
app.post('/url/shorten',verifyUser, handleOriginalUrl);
app.get('/url/:shortID', handleRedirectUrl);
app.delete('/url/:shortID', verifyUser, handleDelete);

app.listen(5000, ()=>{
    console.log("Server Connected Succesfully..");
})

