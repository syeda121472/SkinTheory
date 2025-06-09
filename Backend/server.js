const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Models & Routes
const authRoutes = require('./Router/authRoutes');
const Tip = require('./models/Tip');
const Product = require('./Models/Product'); // ✅ NEW Product model

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGODB_URL;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "10mb" }));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage for tip image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// ----- MongoDB Connection -----
mongoose.connect(MONGOURL)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
  });

// ----- Routes -----

// Auth
app.use('/api/user', authRoutes);

// ------------------ TIPS ------------------

// Submit tip with optional image
app.post('/api/tips', upload.single('image'), async (req, res) => {
  try {
    const { name, tip } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newTip = new Tip({
      name,
      tip,
      image: imageUrl,
    });

    await newTip.save();
    res.status(201).json(newTip);
  } catch (error) {
    console.error('Error saving tip:', error);
    res.status(500).json({ message: 'Failed to submit tip' });
  }
});

// Get all tips
app.get('/api/tips', async (req, res) => {
  try {
    const tips = await Tip.find().sort({ createdAt: -1 });
    res.json(tips);
  } catch (error) {
    console.error('Error fetching tips:', error);
    res.status(500).json({ message: 'Failed to fetch tips' });
  }
});

// ------------------ PRODUCTS ------------------

// Submit product (base64 image)
app.post("/api/products", async (req, res) => {
  try {
    const { title, description, image } = req.body;

    if (!title || !description || !image) {
      return res.status(400).json({ error: "Missing title, description, or image" });
    }

    const newProduct = new Product({
      title,
      description,
      image,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Error saving product:", err);
    res.status(500).json({ error: "Failed to save product" });
  }
});

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});
