import mongoose from "mongoose";

// schema
const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        uniquie: true,
    },
    email: {
        type: String,
        required: true,
        uniquie:true,
    },
    password:{
        type:String,
        required:true,
        
    },
    addresses: [
        {
            firstname: {
                type: String,
                required: true,
            },
            lastname: {
                type: String,
                required: true,
            },
            country: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            zipcode: {
                type: String,
                required: true
            },
            address:{
                type:String,
                required:true,
            },
        },
    ],
    role:{
        type: String,
        default:"user",
    }
}, {
    timestamps:true,
});

// module
const User = mongoose.model("User", userSchema);

export default User;
