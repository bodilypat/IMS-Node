//src/controllers/product.controller.js 

import Product from '../models/product.model.js';

// Create a new product
export const createProduct = async (req, res) => {
    try {
        const { name, price, description, supplierId, quantity, reorderLevel } = req.body;

        // validation
        if (!name || !price || !supplierId) {
            return res.status(400).json({ message: 'Name, price and supplierId are required' });
        }

        const product = await Product.create({
            name,
            price,
            description,
            supplierId,
            quantity: quantity || 0,
            reorderLevel: reorderLevel || 10,
        });

        res.status(201).json({
            message: 'Product created successfully',
            product,
        });
    } catch (error) {
        console.error('Create product error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        .populate('supplierId', 'name email')
        .sort({ createdAt: -1 });

        res.status(200).json({
            message: 'Products retrieved successfully',
            products,
        });
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        .populate('supplierId', 'name email');

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({
            message: 'Product retrieved successfully',
            product,
        });
    } catch (error) {
        console.error('Get product by ID error:', error);
        
        // invalid ObjectId 
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid product ID' });
        }

        res.status(500).json({ message: 'Server error' });
    }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('supplierId', 'name email');

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({
            message: 'Product updated successfully',
            product: updatedProduct,
        });
    } catch (error) {
        console.error('Update product error:', error);

        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid product ID' });
        }

        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({
            message: 'Product deleted successfully',
            product,
        });
    } catch (error) {
        console.error('Delete product error:', error);

        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid product ID' });
        }
        res.status(500).json({ message: 'Server error' });
    }
};

