import express from 'express';
import User from '../models/User.js';
import ClaimHistory from '../models/ClaimHistory.js';

const router = express.Router();

// Claim points for a user
router.post('/', async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Generate random points (1-10)
    const pointsAwarded = Math.floor(Math.random() * 10) + 1;
    
    // Update user's total points
    user.totalPoints += pointsAwarded;
    await user.save();
    
    // Create claim history record
    const claimHistory = new ClaimHistory({
      userId: user._id,
      userName: user.name,
      pointsAwarded
    });
    await claimHistory.save();
    
    res.json({
      success: true,
      pointsAwarded,
      user: {
        id: user._id,
        name: user.name,
        totalPoints: user.totalPoints
      },
      claimHistory
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get claim history
router.get('/history', async (req, res) => {
  try {
    const { page = 1, limit = 10, userId } = req.query;
    const skip = (page - 1) * limit;
    
    let filter = {};
    if (userId) {
      filter.userId = userId;
    }
    
    const history = await ClaimHistory.find(filter)
      .sort({ claimedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('userId', 'name avatarUrl');
    
    const total = await ClaimHistory.countDocuments(filter);
    
    res.json({
      history,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalRecords: total,
        hasNext: skip + history.length < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;