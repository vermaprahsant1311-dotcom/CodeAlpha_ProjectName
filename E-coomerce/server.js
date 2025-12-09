const express = require('express');
const path = require('path');
const session = require('express-session');
const { sequelize } = require('./models');
const Product = require('./models/Product');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

// Serve HTML pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views/index.html')));
app.get('/product/:id', (req, res) => res.sendFile(path.join(__dirname, 'views/product.html')));
app.get('/cart.html', (req, res) => res.sendFile(path.join(__dirname, 'views/cart.html')));
app.get('/login.html', (req, res) => res.sendFile(path.join(__dirname, 'views/login.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'views/register.html')));

const PORT = process.env.PORT || 3000;
sequelize.sync({ force: true }).then(async () => {
  // Seed products if none exist
  const count = await Product.count();
  if (count === 0) {
    await Product.bulkCreate([
  {
    name: "Wireless Headphones",
    price: 129.99,
    description: "Premium over-ear headphones with active noise cancellation",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=60"
  },
  {
    name: "Smart Watch",
    price: 249.99,
    description: "Fitness tracking, heart rate monitor & notifications",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=60"
  },
  {
    name: "MacBook Pro 14\"",
    price: 1999.00,
    description: "M2 Pro chip, 16GB RAM, 512GB SSD – Space Gray",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=60"
  },
  {
    name: "iPhone 15 Pro",
    price: 1099.00,
    description: "Titanium design, A17 Pro, 48MP camera",
    image: "https://images.unsplash.com/photo-1695048132832-b41495f12eb4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Mechanical Keyboard",
    price: 149.99,
    description: "RGB backlit, Cherry MX Blue switches",
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&auto=format&fit=crop&q=60"
  },
  {
    name: "Gaming Mouse",
    price: 79.99,
    description: "16000 DPI, RGB lighting, 8 programmable buttons",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop&q=60"
  },
  {
    name: "4K Webcam",
    price: 119.99,
    description: "Logitech Brio – Ultra HD video calls & streaming",
    image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=600&auto=format&fit=crop&q=60"
  },
  {
    name: "Portable SSD 1TB",
    price: 109.99,
    description: "Samsung T7 – USB 3.2, up to 1050MB/s",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=60"
  },
    {
    name: "Bluetooth Speaker",
    price: 89.99,
    description: "JBL Flip 6 – Waterproof, 12H battery",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop&q=60"
  },
  {
    name: "Laptop Stand",
    price: 44.99,
    description: "Adjustable aluminum stand for better ergonomics",
    image: "https://images.unsplash.com/photo-1629317480872-45e07211ffd4?w=600&auto=format&fit=crop&q=60"
  },
  {
    name: "Wireless Charger",
    price: 39.99,
    description: "15W Fast charging pad for iPhone & Android",
    image: "https://images.unsplash.com/photo-1591290619618-904f6dd935e3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2lyZWxlc3MlMjBjaGFyZ2VyfGVufDB8fDB8fHww"
  },
  {
    name: "Noise-Cancelling Earbuds",
    price: 229.99,
    description: "Sony WF-1000XM5 – Best in class ANC",
    image: "https://images.unsplash.com/photo-1662348316397-7afeb1045fd7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fE5vaXNlLUNhbmNlbGxpbmclMjBFYXJidWRzfGVufDB8fDB8fHww"
  },
  {
    name: "27\" 4K Monitor",
    price: 379.99,
    description: "IPS panel, HDR10, 60Hz, USB-C",
    image: "https://plus.unsplash.com/premium_photo-1669380425564-6e1a281a4d30?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8MjclMjIlMjA0SyUyME1vbml0b3J8ZW58MHx8MHx8fDA%3D"
  },
  {
    name: "Ergonomic Office Chair",
    price: 299.99,
    description: "Mesh back, lumbar support, adjustable arms",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop&q=60"
  },
  {
    name: "Ring Light 18\"",
    price: 89.99,
    description: "Perfect for streaming, makeup & video calls",
    image: "https://media.istockphoto.com/id/1327228809/photo/ring-lamp-with-the-smartphone-holder-on-lilaceous-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=OqSQIWkH0AfK6fJdIj2gEtnfwI2d_4DLURvSFo0n3kY="
  },
  {
    name: "USB-C Hub 7-in-1",
    price: 49.99,
    description: "HDMI, SD card, USB 3.0, PD charging",
    image: "https://media.istockphoto.com/id/2193619816/photo/usb-type-c-hub-isolated-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=1OpABJ_kpTlyTBqkFCEICMOSjtUbpnrGQTwF6pMaoE0="
  },
  {
    name: "Smart LED Bulbs (4-Pack)",
    price: 59.99,
    description: "WiFi, RGB + White, Alexa & Google Home",
    image: "https://images.unsplash.com/photo-1622574372197-b8e9fe9f522c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fFNtYXJ0JTIwTEVEJTIwQnVsYnMlMjAoNC1QYWNrKXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    name: "Backpack Anti-Theft",
    price: 74.99,
    description: "USB charging port, water-resistant",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=60"
  },
  {
    name: "Drone Mini 4K",
    price: 449.00,
    description: "DJI Mini 4K camera, 30min flight time",
    image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=600&auto=format&fit=crop&q=60"
  },
  {
    name: "Fitness Tracker Band",
    price: 69.99,
    description: "Heart rate, sleep tracking, waterproof",
    image: "https://plus.unsplash.com/premium_photo-1681433386259-1ea114ca923d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Rml0bmVzcyUyMFRyYWNrZXIlMjBCYW5kfGVufDB8fDB8fHww"
  }
  ]);
    console.log("Products seeded!");
  }
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
