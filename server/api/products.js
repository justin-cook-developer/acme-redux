const express = require('express');
const router = express.Router();

const { Product } = require('../db/index');

router.get('/', async (req, res, next) => {
  try {
    const prods = await Product.findAll();
    res.json(prods);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body);
    const prod = await Product.create(req.body);
    res.json(prod);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Product.destroy({ where: { id: req.params.id } });
    res.json({
      msg: `Successfully deleted the product with id: ${req.params.id}`,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
