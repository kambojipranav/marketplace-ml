import express from "express";
import multer from "multer";
import cors from "cors";
import mongoose from "mongoose";
import { getSimilarProducts } from "./mlEngine.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// ---------------- DATABASE ----------------
mongoose.connect("mongodb://127.0.0.1:27017/marketplace_ml")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ---------------- MODEL ----------------
const Product = mongoose.model("Product", new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  tags: [String],
  imageUrl: String,
}));

// ---------------- FILE UPLOAD ----------------
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });


// ---------------- ROUTES ----------------

// CREATE PRODUCT
app.post("/api/products", upload.single("image"), async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      tags: JSON.parse(req.body.tags),
      imageUrl: req.file?.path,
    });
    res.json(product);
  } catch {
    res.status(500).json({ error: "Failed to create product" });
  }
});

// GET ALL PRODUCTS
app.get("/api/products", async (req, res) => {
  res.json(await Product.find());
});

// LIVE/DYNAMIC SEARCH
app.get("/api/products/search", async (req, res) => {
  const { q } = req.query;
  if (!q) return res.json([]);

  const products = await Product.find({
    title: { $regex: q, $options: "i" }
  });

  res.json(products);
});

// GET SINGLE ITEM + RECOMMENDED ITEMS
app.get("/api/products/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  const others = await Product.find({ _id: { $ne: req.params.id } });

  const recommendations = getSimilarProducts(product, others);

  res.json({ product, recommendations });
});

// UPDATE PRODUCT (PUT)
app.put("/api/products/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, tags: JSON.parse(req.body.tags) },
      { new: true }
    );
    res.json(updated);
  } catch {
    res.status(500).json({ error: "Failed to update product" });
  }
});

// DELETE PRODUCT
app.delete("/api/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});


// ---------------- SERVER ----------------
app.listen(5000, () =>
  console.log("🚀 Backend running at http://localhost:5000")
);
