import Product from "../models/product.model.js";
import Supplier from "../models/supplier.model.js";
import Transaction from "../models/transaction.model.js";

// ===============================
// DASHBOARD STATS (TOP CARDS)
// ===============================
export const dashboardStats = async (req, res) => {
  try {
    const [totalProducts, totalSuppliers, totalTransactions, lowStockCount] =
      await Promise.all([
        Product.countDocuments(),
        Supplier.countDocuments(),
        Transaction.countDocuments(),
        Product.countDocuments({ stock: { $lt: 10 } }),
      ]);

    res.status(200).json({
      totalProducts,
      totalSuppliers,
      totalTransactions,
      lowStockCount,
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({
      message: "Error fetching dashboard stats",
    });
  }
};

// ===============================
// RECENT TRANSACTIONS
// ===============================
export const recentTransactions = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 10;

    const transactions = await Transaction.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("productId", "name")
      .populate("supplierId", "name");

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Recent Transactions Error:", error);
    res.status(500).json({
      message: "Error fetching recent transactions",
    });
  }
};

// ===============================
// INVENTORY LEVELS (CHART DATA)
// ===============================
export const inventoryLevels = async (req, res) => {
  try {
    const products = await Product.find().select("name stock");

    res.status(200).json(
      products.map((p) => ({
        name: p.name,
        stock: p.stock,
      }))
    );
  } catch (error) {
    console.error("Inventory Levels Error:", error);
    res.status(500).json({
      message: "Error fetching inventory levels",
    });
  }
};

// ===============================
// SUPPLIER PERFORMANCE
// ===============================
export const supplierPerformance = async (req, res) => {
  try {
    const performance = await Transaction.aggregate([
      { $match: { type: "purchase" } },
      {
        $group: {
          _id: "$supplierId",
          totalSupplied: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "suppliers",
          localField: "_id",
          foreignField: "_id",
          as: "supplier",
        },
      },
      { $unwind: "$supplier" },
      {
        $project: {
          _id: 0,
          supplierId: "$supplier._id",
          name: "$supplier.name",
          totalSupplied: 1,
        },
      },
      { $sort: { totalSupplied: -1 } },
    ]);

    res.status(200).json(performance);
  } catch (error) {
    console.error("Supplier Performance Error:", error);
    res.status(500).json({
      message: "Error fetching supplier performance",
    });
  }
};
