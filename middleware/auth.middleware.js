import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const isAuthenticated = async (req,res,next)=>{
    try {
        
        const token = req.cookies.token || req.header("Authorization")?.split(" ")[1];
        if(!token){
            res.status(400),json({
                success:false,
                message:"unauthorized user!"
            })
        }
        const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findById(decodeToken?._id);
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Smothing wrong with authenticate user",
        });
    }
};

export const isAdmin = (req,res,next)=>{
    try {
        const userData = req.user;
        if(userData && userData?.role === "admin"){
            return next();
        }else{
            res.status(400).json({
                success: false,
                message: "Unauthorized",
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Smothing wrong with authenticate admin",
        });   
    }
}