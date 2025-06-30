const functions = require("firebase-functions");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = functions.config().mongodb.uri;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Model
const Product = require("./models/Product");
const evaluateHealth = require("./helpers/evaluateHealth");

// Routes
app.get("/products/:barcode", async (req, res) => {
  try {
    const product = await Product.findOne({ barcode: req.params.barcode });
    if (!product) return res.status(404).json({ message: "Produk tidak ditemukan" });
    const result = evaluateHealth(product);
    res.status(200).json({ ...product._doc, ...result });
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil produk", error: err.message });
  }
});

app.post("/products", async (req, res) => {
  try {
    const existing = await Product.findOne({ barcode: req.body.barcode });
    if (existing) return res.status(409).json({ message: "Produk sudah ada" });

    const product = new Product(req.body);
    await product.save();

    const result = evaluateHealth(product);
    res.status(201).json({ ...product._doc, ...result });
  } catch (err) {
    res.status(500).json({ message: "Gagal menyimpan produk", error: err.message });
  }
});

// Export as Cloud Function
exports.api = functions.https.onRequest(app);
