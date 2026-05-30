const express = require('express');
const router = express.Router();

const Article = require('../models/Article');

// GET all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single article
router.get('/:name', async (req, res) => {
  try {
    const article = await Article.findOne({
      name: req.params.name,
    });

    if (!article) {
      return res.status(404).json({
        message: 'Article not found',
      });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE article
router.post('/', async (req, res) => {
  try {
    const article = await Article.create(req.body);

    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE article
router.put('/:id', async (req, res) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedArticle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE article
router.delete('/:id', async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Article deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ENABLE / DISABLE article
router.patch('/:id/status', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    article.isActive = article.isActive === false ? true : false;

    await article.save();

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;