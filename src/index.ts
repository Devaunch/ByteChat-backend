import { config } from "dotenv";
config();
import express from "express";

const app = express();
const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Listening at port: ${PORT}`)
})