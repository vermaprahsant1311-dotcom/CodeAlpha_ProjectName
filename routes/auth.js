const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const devnet =require('dotenv')
devnet.config()

router.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    if(!user){
      return res.status(401).json({message:"Unable to register"})
    }
    const token = jwt.sign({
      userId:user.id,
      email:user.email,
      password:user.password
    },
      process.env.JWT_TOKEN,{
        expiresIn:"7d"
    })
    res.status(201).json({ message: "User registered",token,user});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  req.session.userId = user.id;
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  res.json({ message: "Logged in", 
    user: { id: user.id, username: user.username },
    token 
  });
  });

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: "Logged out" });
});

module.exports = router;