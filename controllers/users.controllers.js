// api
import { hashSync } from 'bcryptjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";

// api for user
export const registerUser = async()=>{

    try {
        const {username,email,password} = req.body();
        if(!username || !email || password){
           return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }
        const userExist = await User.findOne({email})
        if(userExist){
           return res.status(401).json({
                success:false,
                message:"User already exist",
            });
        }
        // password hashing
        const hashPassword = hashSync.bcrypt(password, 8)
        const user = await User({
            username,
            email,
            password : hashPassword,
        });
        await user.save();
        // jwt tolen
        const token = await jwt.sign({_id:user?._id}, process.env.SECRET_KEY,{expiresIn:"1d"});
        res.status(201).cookies("token", token,{
            maxAge:1*24*60*60*1000,
            httpOnly: true,
            secure:true,
            sameSite:"None"
        }) .json({
            success:true,
            message:"Register Successfully",
            user,
            token,
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Smothing wrong with register user"
        });
       
    }
};

export const loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body();
        if( !email || password){
           return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }
        const user = await User.findOne({email})
        if(!user){
           return res.status(401).json({
                success:false,
                message:"User does not exist",
            });
        }

        const comparePassword = bcrypt.compareSync(
            password,
            user.password,
        );
        if(!comparePassword){
            return res.status(401).json({
                 success:false,
                 message:"Invalid Data!",
             });
         }

         res.status(200).cookies("token",token,{
           
                maxAge:1*24*60*60*1000,
                httpOnly: true,
                secure:true,
                sameSite:"None",
         })
         .json({
                success:true,
                message:"Login Successfully",
                user,
                token,
            });
         
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Smothing wrong with Login",
        });
    }
};

export const logoutUser = async(req,res)=>{
        try {
            
            return res
            .status(200).cookies("token","",{
           
                maxAge:0,
                httpOnly: true,
                secure:true,
                sameSite:"None",
         })
         .json({
                success:true,
                message:"Logout Successfully",
            });
        } catch (error) {
            res.status(500).json({
                success:false,
                message:"Smothing wrong with Logout",
            });
        }
};
export const profileUser = async(req,res)=>{
    try {
        const user = await User.findOne(req.user?._id);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User Not Found!",
            })
        }
        return res
        .status(200).cookies("token","",{
       
            maxAge:0,
            httpOnly: true,
            secure:true,
            sameSite:"None",
     })
     .json({
            success:true,
            message:"Logout Successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Smothing wrong with Logout",
        });
    }
};

export const updateUser = async(req,res)=>{
    try {
        const {username,email}= req.body;
        const user = await User.findOne(req.user?._id);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User Not Found!",
            })
        }
        // using javascript
        user.username = username;
        user.email = email;

        await user.save();
        return res
        .status(200).cookies("token","",{
       
            maxAge:0,
            httpOnly: true,
            secure:true,
            sameSite:"None",
     })
     .json({
            success:true,
            message:"Logout Successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Smothing wrong with Logout user",
        });
    }
}