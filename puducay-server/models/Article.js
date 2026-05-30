const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  summary: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: String, required: true },
  readTime: { type: String, required: true },
  image: { type: String, required: true },
  content: [{ type: String }],
  isActive: { type: Boolean, default: true },
});

module.exports =
  mongoose.models.Article || mongoose.model('Article', articleSchema);  