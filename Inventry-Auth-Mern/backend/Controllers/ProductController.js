const ProductModel = require("../Models/Product");
const CategoryModel = require("../Models/Category");

// Create Product
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, quantity, sku } = req.body;

        if (!name || !description || !price || !category) {
            return res.status(400).json({ 
                message: 'Name, description, price, and category are required', 
                success: false 
            });
        }

        // Verify category exists
        const categoryExists = await CategoryModel.findById(category);
        if (!categoryExists) {
            return res.status(404).json({ 
                message: 'Category not found', 
                success: false 
            });
        }

        const product = new ProductModel({
            name,
            description,
            price,
            category,
            quantity: quantity || 0,
            sku
        });

        await product.save();
        await product.populate('category');

        res.status(201).json({
            message: "Product created successfully",
            success: true,
            product
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
};

// Get All Products with Pagination, Search, and Filter
const getAllProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '', category = '' } = req.query;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        let query = {};

        // Search by name or description
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Filter by category
        if (category) {
            query.category = category;
        }

        const total = await ProductModel.countDocuments(query);
        const products = await ProductModel.find(query)
            .populate('category')
            .skip(skip)
            .limit(limitNum)
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Products retrieved successfully",
            success: true,
            products,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                pages: Math.ceil(total / limitNum)
            }
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
};

// Get Product by ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findById(id).populate('category');

        if (!product) {
            return res.status(404).json({ 
                message: 'Product not found', 
                success: false 
            });
        }

        res.status(200).json({
            message: "Product retrieved successfully",
            success: true,
            product
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
};

// Update Product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, quantity, sku } = req.body;

        // Verify category exists if provided
        if (category) {
            const categoryExists = await CategoryModel.findById(category);
            if (!categoryExists) {
                return res.status(404).json({ 
                    message: 'Category not found', 
                    success: false 
                });
            }
        }

        const product = await ProductModel.findByIdAndUpdate(
            id,
            { name, description, price, category, quantity, sku },
            { new: true, runValidators: true }
        ).populate('category');

        if (!product) {
            return res.status(404).json({ 
                message: 'Product not found', 
                success: false 
            });
        }

        res.status(200).json({
            message: "Product updated successfully",
            success: true,
            product
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
};

// Delete Product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ 
                message: 'Product not found', 
                success: false 
            });
        }

        res.status(200).json({
            message: "Product deleted successfully",
            success: true
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
