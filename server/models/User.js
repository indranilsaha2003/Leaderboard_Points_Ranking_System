import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  totalPoints: {
    type: Number,
    default: 0,
    min: 0
  },
  avatarUrl: {
    type: String,
    default: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Virtual for rank calculation
userSchema.virtual('rank').get(function() {
  return this._rank;
});

// Include virtuals in JSON
userSchema.set('toJSON', { virtuals: true });

export default mongoose.model('User', userSchema);