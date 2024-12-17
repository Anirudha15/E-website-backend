import User from "../models/user.model";

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
        const user = await User({
            username,
            email,
            password,
        });
        await user.save();
        res.status(201).json({
            success:true,
            message:"Register Successfully"
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Smothing wrong with register user"
        });
       
    }
};