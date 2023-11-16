const router = require('express').Router();
const { Category, Product } = require('../../models');


// GET all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a specific category by ID
router.get('/:id', async (req, res) => {
  try {
    const categoriesById = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoriesById) {
      res.status(404).json({ message: 'No Categories found with this id!' });
      return;
    }

    res.status(200).json(categoriesById);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const createCategory = await Category.create(req.body);
    res.status(200).json(createCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT (update) a category
router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!updateCategory[0]) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }

    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a category
router.delete('/:id', async (req, res) => {
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteCategory) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }

    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
