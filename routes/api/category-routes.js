const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryRouteData = await models.Category.findAll({
      include: [{ model: models.Product }],
    });
    res.json(categoryRouteData);
  } catch (err) {
    res.json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryRouteData = await models.Category.findByPk(req.params.id, {
      include: [{ model: models.Product }],
    });
    res.json(categoryRouteData);
  } catch (err) {
    res.json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  const categoryRouteData = await models.Category.create(req.body);
  res.json(categoryRouteData);
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryRouteData = await models.Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: { id: req.params.id },
      }
    );
    return res.json(categoryRouteData);
  } catch (err) {
    res.json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  await models.Product.destroy({ where: { category_id: req.params.id } });
  const categoryRouteData = await models.Category.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.json(categoryRouteData);
});

module.exports = router;
