const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
  subtitle: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
});

const UploadSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    subcategory: {
      type: String,
      trim: true,
    },
    section: {
      type: String,
      enum: ['main', 'featured', 'bottom', 'headline'],
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    sections: {
      type: [SectionSchema],
      validate: (val) => Array.isArray(val) && val.length > 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Upload', UploadSchema);
