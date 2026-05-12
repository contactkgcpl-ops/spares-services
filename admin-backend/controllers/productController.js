const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const Product = require('../models/Product');

const toArray = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: products.length, data: products });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch products', error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid product id' });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch product', error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    console.log('=== CREATE PRODUCT DEBUG ===');
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);
    
    let imagePath = req.body.image; // Default to provided image URL
    
    // If file was uploaded, use the uploaded file path
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
      console.log('Using uploaded file:', imagePath);
      console.log('File saved to:', req.file.path);
      console.log('File size:', req.file.size, 'bytes');
      
      // Verify file exists physically
      const fullPath = path.join(__dirname, '..', req.file.path);
      const fileExists = fs.existsSync(fullPath);
      const fileStats = fileExists ? fs.statSync(fullPath) : null;
      
      console.log('Physical file exists:', fileExists);
      console.log('Physical file size:', fileStats ? fileStats.size : 'N/A');
      
      if (!fileExists || (fileStats && fileStats.size === 0)) {
        return res.status(500).json({ 
          success: false, 
          message: 'File upload failed - file was not saved properly' 
        });
      }
    }

    const payload = {
      ...req.body,
      image: imagePath,
      features: toArray(req.body.features),
      specifications: toArray(req.body.specifications),
    };

    console.log('Final payload:', payload);
    console.log('=== END CREATE PRODUCT DEBUG ===');

    const product = await Product.create(payload);
    return res.status(201).json({ success: true, message: 'Product created successfully', data: product });
  } catch (error) {
    console.error('Create product error:', error);
    return res.status(400).json({ success: false, message: 'Failed to create product', error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    console.log('=== UPDATE PRODUCT DEBUG ===');
    console.log('Request params:', req.params);
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);
    
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid product id' });
    }

    let payload = {
      ...req.body,
      ...(req.body.features !== undefined ? { features: toArray(req.body.features) } : {}),
      ...(req.body.specifications !== undefined ? { specifications: toArray(req.body.specifications) } : {}),
    };

    // If file was uploaded, update image path
    if (req.file) {
      payload.image = `/uploads/${req.file.filename}`;
      console.log('Using uploaded file:', payload.image);
      console.log('File saved to:', req.file.path);
      console.log('File size:', req.file.size, 'bytes');
      
      // Verify file exists physically
      const fullPath = path.join(__dirname, '..', req.file.path);
      const fileExists = fs.existsSync(fullPath);
      const fileStats = fileExists ? fs.statSync(fullPath) : null;
      
      console.log('Physical file exists:', fileExists);
      console.log('Physical file size:', fileStats ? fileStats.size : 'N/A');
      
      if (!fileExists || (fileStats && fileStats.size === 0)) {
        return res.status(500).json({ 
          success: false, 
          message: 'File upload failed - file was not saved properly' 
        });
      }
    }

    console.log('Final payload:', payload);
    console.log('=== END UPDATE PRODUCT DEBUG ===');

    const product = await Product.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    return res.status(200).json({ success: true, message: 'Product updated successfully', data: product });
  } catch (error) {
    console.error('Update product error:', error);
    return res.status(400).json({ success: false, message: 'Failed to update product', error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid product id' });
    }

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Delete associated image file if it exists and is uploaded
    if (product.image && product.image.startsWith('/uploads/')) {
      const imagePath = path.join(__dirname, '..', product.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log('Deleted image file:', imagePath);
      }
    }

    return res.status(200).json({ success: true, message: 'Product deleted successfully', data: product });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to delete product', error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
