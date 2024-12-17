// Because we define module in express so we cant write express directly
import express from "express"
// const express = require('express')
import bodyParser from "body-parser";
import cors from "cors"
import cookieParser from "cookie-parser";
import { connect } from "mongoose";
const app = express();
import"dotenv/config";
import dbConnect from "./db/conn.js";
const port = process.env.PORT || 3000;

console.log("port :",process.env.PORT);

// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("Hello world my name is anirdha");
});

dbConnect();

app.listen(port,()=>{
    console.log(`Server listenindg on port ${port}`);
    
})