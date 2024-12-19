import Product from "../models/product.model.js"

export const createManyProducts = async (res, req) => {
    try {
        const { 
            name,
            title,
            description, 
            brand, 
            price, 
            category, 
            color, 
            productCount, 
            image, 
        } = req.body;
        if(
            (!name ||
            !title||
            !description||
            !brand|| 
            !price||
            !category|| 
            !color|| 
            !image)
        )
        {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        const products = await Product.insertMany();
        await products.save();
        res.status(201).json({
            success: true,
            message: "products created sucessfully ",
            products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Smothing wrong with creating product ",
        });
    }
}

export const createProduct = async (res, req) => {
    try {
        const { 
            name,
            title,
            description, 
            brand, 
            price, 
            category, 
            color, 
            productCount, 
            image, 
        } = req.body;
        if(
            (!name ||
            !title||
            !description||
            !brand|| 
            !price||
            !category|| 
            !color|| 
            !image)
        )
        {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        const product = await Product({
            userId: req.user?._id,
            name,
            title,
            description, 
            brand, 
            price, 
            category, 
            color, 
            productCount, 
            image 
        });
        await product.save();
        res.status(201).json({
            success: true,
            message: "product created sucessfully ",
            product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Smothing wrong with creating product ",
        });
    }
}

export const getAllProduct = async (res, req) => {
    try {
        const products = await Product.find({});
        if(!products){
            res.status(500).json({
                success: false,
                message: "product not found",
            });
        }
        res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something wrong with creating product ",
        });
    }
};

export const deleteProduct = async (res, req) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
            res.status(500).json({
                success: false,
                message: "product not found",
            });
        }

        await Product.findByIdAndDelete(product);

        res.status(200).json({
            success: true,
            message:"Product deleted sucessfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something wrong with creating product ",
        });
    }
};

export const updateProduct = async (res, req) => {
    try {
        const {
            name,
            title,
            description, 
            brand, 
            price, 
            category, 
            color, 
            productCount, 
            image,
        } = req.body;
        const product = await Product.findById(req.params.id);
        if(!product){
            res.status(500).json({
                success: false,
                message: "product not found",
            });
        }

        const updateProduct = await Product.findByIdAndUpdate(
            product,
            {
                $set:{
            name,
            title,
            description, 
            brand, 
            price, 
            category, 
            color, 
            productCount, 
            image,
                },
            },
            {new:true}
        );
        res.status(200).json({
            success: true,
            message:"Product updated sucessfully",
            product:updateProduct,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something wrong with creating product ",
        });
    }
};