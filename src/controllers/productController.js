import Product from '../models/product.js';

export const createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const product = new Product({ name, description, price });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) throw Error('Product not found');
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        await Product.findByIdAndUpdate(req.params.id, { name, description, price });
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
