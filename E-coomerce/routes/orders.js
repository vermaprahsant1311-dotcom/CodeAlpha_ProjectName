const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

const auth = (req, res, next) => {
  if (!req.session.userId) return res.status(401).json({ error: "Unauthorized" });
  next();
};

router.post('/', auth, async (req, res) => {
  const { items, total } = req.body;
  const order = await Order.create({
    items,
    total,
    UserId: req.session.userId
  });
  res.json({ message: "Order placed!", order });
});

module.exports = router;