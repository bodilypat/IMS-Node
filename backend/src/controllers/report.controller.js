//src/controllers/report.controller.js 

import Product from '../models/product.model.js';
import Transaction from '../models/transaction.model.js';

// Low stock report
export const getLowStockReport = async (req, res) => {
    try {
      const lowStockProducts = await Product.find({ quantity: { $lte: 10 } })
        .populate('supplierId', 'name email')
        .sort({ quantity: 1 });
      res.status(200).json({
        message: 'Low stock report retrieved successfully',
        products: lowStockProducts,
      });
    } catch (error) {
      console.error('Get low stock report error:', error);
      res.status(500).json({ message: 'Server error' });
    }
};

// Sales report (by product)
export const getSalesReport = async (req, res) => {
  try {
    const salesReport = await Transaction.aggregate([
      { $match: { type: 'sale' } },
      {
        $group: {
          _id: '$productId',
          totalQuantitySold: { $sum: '$quantity' },
          totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } },
        },
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'productDetails',
        },
      },
      { $unwind: '$productDetails' },
    ]);

    res.status(200).json({
      message: 'Sales report retrieved successfully',
      salesReport,
    });
  } catch (error) {
    console.error('Get sales report error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Inventory value report
export const getInventoryValueReport = async (req, res) => {
    try {
        const inventoryValue = await Product.aggregate([
            {
                $group: {
                    _id: null,
                    totalValue: { $sum: { $multiply: ['$price', '$quantity'] } },
                },
            },
        ]);
        res.status(200).json({
            message: 'Inventory value report retrieved successfully',
            totalValue: inventoryValue[0] ? inventoryValue[0].totalValue : 0,
        });
    } catch (error) {
        console.error('Get inventory value report error:', error);
        res.status(500).json({ message: 'Server error' });
    } catch (error) {
        console.error('Get inventory value report error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get transaction history for a product
export const getTransactionHistory = async (req, res) => {
    try {
        const transactions = await Transaction.find({ productId: req.params.productId })
        .sort({ createdAt: -1 });
        res.status(200).json({
            message: 'Transaction history retrieved successfully',
            transactions,
        });
    } catch (error) {
        console.error('Get transaction history error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get sales report by date range
export const getSalesReportByDateRange = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const salesReport = await Transaction.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate),
                    },
                    type: 'sale',
                },
            },
            {
                $group: {
                    _id: '$productId',
                    totalQuantitySold: { $sum: '$quantity' },
                    totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } },
                },
            },
            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: '_id',  
                    as: 'productDetails',
                },
            },
            { $unwind: '$productDetails' },
        ]);
        res.status(200).json({
            message: 'Sales report by date range retrieved successfully',
            salesReport,
        });
    } catch (error) {
        console.error('Get sales report by date range error:', error);
        res.status(500).json({ message: 'Server error' });
    } catch (error) {
        console.error('Get sales report by date range error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

