const mongoose = require('mongoose');

const storySlideSchema = new mongoose.Schema({
  text: { type: String, required: false },
  imageUrl: { type: String, required: false },
  ctaLink: { type: String, required: false }
});

const storySchema = new mongoose.Schema({
  title: { type: String, required: true },
  authorName: { type: String, required: true },
  category: { type: String, required: false },
  storyType: { type: String, enum: ['text', 'image', 'video'], required: true },
  slides: [storySlideSchema],
  tags: [String],
  expiryTime: { type: String, enum: ['24h', '48h', 'forever'], default: 'forever' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Story', storySchema);
