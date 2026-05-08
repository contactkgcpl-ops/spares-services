const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const Product = require('./models/Product');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/api/products', productRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ ok: true, message: 'Admin backend running' });
});

app.get('/test', (req, res) => {
  res.status(200).send('Server Working');
});

app.use((err, req, res, next) => {
  if (err?.type === 'entity.too.large') {
    console.error('Payload too large for request:', req.method, req.originalUrl);
    return res.status(413).json({ success: false, message: 'Image is too large. Please upload a smaller image.' });
  }

  if (err) {
    console.error('Unhandled backend error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }

  return next();
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

  app.listen(PORT, HOST, () => {
    console.log(`Admin backend server running on http://${HOST}:${PORT}`);
  });
};

startServer();
