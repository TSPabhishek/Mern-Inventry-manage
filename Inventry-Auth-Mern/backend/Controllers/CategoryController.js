const CategoryModel = require("../Models/Category");

// Create Category
const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        
        if (!name) {
            return res.status(400).json({ 
                message: 'Category name is required', 
                success: false 
            });
        }

        const existingCategory = await CategoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(409).json({ 
                message: 'Category already exists', 
                success: false 
            });
        }

        const category = new CategoryModel({ name, description });
        await category.save();

        res.status(201).json({
            message: "Category created successfully",
            success: true,
            category
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
};

// Get All Categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        res.status(200).json({
            message: "Categories retrieved successfully",
            success: true,
            categories
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
};

// Get Category by ID
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await CategoryModel.findById(id);

        if (!category) {
            return res.status(404).json({ 
                message: 'Category not found', 
                success: false 
            });
        }

        res.status(200).json({
            message: "Category retrieved successfully",
            success: true,
            category
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
};

// Update Category
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const category = await CategoryModel.findByIdAndUpdate(
            id,
            { name, description },
            { new: true, runValidators: true }
        );

        if (!category) {
            return res.status(404).json({ 
                message: 'Category not found', 
                success: false 
            });
        }

        res.status(200).json({
            message: "Category updated successfully",
            success: true,
            category
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
};

// Delete Category
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await CategoryModel.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({ 
                message: 'Category not found', 
                success: false 
            });
        }

        res.status(200).json({
            message: "Category deleted successfully",
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
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};
