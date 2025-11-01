import express from 'express';
import Portfolio from '../models/Portfolio.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get portfolio data
router.get('/', async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = await Portfolio.create({});
    }
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update portfolio data
router.put('/', auth, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = await Portfolio.create(req.body);
    } else {
      portfolio = await Portfolio.findOneAndUpdate({}, req.body, { new: true });
    }
    res.json(portfolio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;