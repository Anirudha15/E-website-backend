import mongoose from "mongoose";

// schema
const orderSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    shippingAddress:
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
        }
    },
    orderItems: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            totalPrice: {
                type: Number,
                required: true,
            },

        }
    ],

    totalAmount: {
        type: Number,
        required: true,
    },
    totalTax: {
        type: Number,
        default:0,
    },
    shippingCharge: {
        type: Number,
        required: true,
        default:0,
    },
    status:{
        type:String,
        default:"Pending"
    },
    paidAt:{
        type:Date,
        default:Date.now(),
    },
    isPaid:{
        type:Boolean,
        default:false,
    },
    deliveredAt:{
        type:Date,
        
    },
  },
    {
        timestamps: true,
    }
);

// module
const Order = mongoose.model("Order", orderSchema);

export default Order;
