const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const Product = require('./models/Product');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Created uploads directory:', uploadsDir);
}

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors());
app.use(express.json());
app.use('/api/products', productRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ ok: true, message: 'Admin backend running' });
});

const seedProductsIfEmpty = async () => {
  const count = await Product.countDocuments();
  if (count > 0) return;

  await Product.insertMany([
    {
      title: 'High-Flow Centrifugal Pump',
      category: 'Pump Systems',
      image: 'https://images.unsplash.com/photo-1581092921461-eab10380fef2?q=80&w=1200&auto=format&fit=crop',
      description: 'High-throughput industrial pump designed for stable pressure and continuous operation.',
      features: ['High flow rate', 'Low vibration', 'Corrosion-resistant body'],
      specifications: ['Flow Rate: 180 L/min', 'Power: 4.0 kW', 'Material: SS316'],
      slug: 'high-flow-centrifugal-pump',
    },
    {
      title: 'Precision Control Valve',
      category: 'Valves',
      image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=1200&auto=format&fit=crop',
      description: 'Precision valve for fine flow control in high-demand industrial process lines.',
      features: ['Low pressure drop', 'PTFE sealing', 'Compact build'],
      specifications: ['Type: Globe valve', 'Diameter: 40 mm', 'Pressure Class: PN16'],
      slug: 'precision-control-valve',
    },
  ]);

  console.log('Seeded sample products because database was empty.');
};

const startServer = async () => {
  await connectDB();
  await seedProductsIfEmpty();

  app.listen(PORT, () => {
    console.log(`Admin backend server running on port ${PORT}`);
    console.log(`Uploads directory: ${uploadsDir}`);
  });
};

startServer();
