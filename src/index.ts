import { config } from "dotenv";
config();
import express from "express";
import cors from "cors"
import authRouter from "./routes/auth";

//import constants
const app = express();
const PORT = process.env.PORT

//essential middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors())

//routers
app.use('/api/auth', authRouter)

//listening to the server
app.listen(PORT, ()=>{
    console.log(`Listening at port: ${PORT}`)
})