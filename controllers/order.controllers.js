import Order from "../models/order.model.js";
import User from "../models/user.model.js";

export const createOrder = async (res, req) => {
    try {
        const { 
            orderItems,
            totalAmount,
            totalTax,
            shippingCharge,
            shippingAddress,
        } = req.body;
        
        const order = await Order({
            userId: req.user?._id,
            orderItems,
            totalAmount,
            totalTax,
            shippingCharge,
            shippingAddress,
        });
        await order.save();
        res.status(201).json({
            success: true,
            message: "order created sucessfully ",
            order,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Smothing wrong with creating order ",
        });
    }
}

export const getMyOrders = async (res, req) => {
    try {
    
        // const user = await User.find(req.user?._id);
        
        const order = await Order.find(req.user?._id);
        
        if(!order){
            res.status(401).json({
                success: false,
                message: "order not found ",
            });
        }

        res.status(201).json({
            success: true,
            order,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Smothing wrong with creating order ",
        });
    }
}


export const getAllOrders = async (res, req) => {
    try {
    
        
        const orders = await Order.find({});
        
        if(!orders){
            res.status(401).json({
                success: false,
                message: "order not found ",
            });
        }

        res.status(201).json({
            success: true,
            orders,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Smothing wrong with creating order ",
        });
    }
}

export const getOrderById = async (res, req) => {
    try {
        
        const order = await Order.find(req.params.id);
        if(!order){
            res.status(401).json({
                success: false,
                message: "order not found ",
            });
        }

        res.status(201).json({
            success: true,
            order,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Smothing wrong with creating order ",
        });
    }
}

export const deleteOrderById = async (res, req) => {
    try {
        
        const order = await Order.find(req.params.id);
        
        if(!order){
            res.status(401).json({
                success: false,
                message: "order not found ",
            });
        }
        await Order.findByIdAndDelete(order);
        res.status(201).json({
            success: true,
            message: "order deleted sucessfully ",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Smothing wrong with creating order ",
        });
    }
}

export const updarteOrderStatus = async (res, req) => {
    try {
        const {status} = req.body
        let order = await Order.find(req.params.id);
        
        if(!order){
            res.status(401).json({
                success: false,
                message: "order not found ",
            });
        }

        order.status = status;
         await order.save()
        res.status(201).json({
            success: true,
            message:"Order status updated sucessfully",
            order,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Smothing wrong with updating status",
        });
    }
}