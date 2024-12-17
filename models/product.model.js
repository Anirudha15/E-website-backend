import mongoose from "mongoose";

// schema
const productSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    name: {
        type: String,
        required: true,
    },
    title:{
        type:String,
        required:true,
    },
    discription:{
        type:String,
        require:true,
    },
    brand: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    color:{
        type:String,
        required:true,
    },
    ratings:{
        type:Number,
        default:0,
    },
    productCount:{
        type:Number,
        default:0,
    },
    totalReviews:{
        type:Number,
        default:0,
    },
    reviews:[],
    image:{
        type:String,
        required:true,
    },
}, 
   {
    timestamps:true,
   }
);

// module
const Product = mongoose.model("Product", productSchema);

export default Product;
