const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagRouteData = await models.Tag.findAll({
      include: [{ model: models.Product, as: "tagged_products" }],
    });
    res.json(tagRouteData);
  } catch (err) {
    res.json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagRouteData = await models.Tag.findByPk(req.params.id, {
      include: [{ model: models.Product, as: "tagged_products" }],
    });
    res.json(tagRouteData);
  } catch (err) {
    res.json(err);
  }
});

router.post("/", async (req, res) => {
  const tagRouteData = await models.Tag.create(req.body);
  res.json(tagRouteData);
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagRouteData = await models.Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: { id: req.params.id },
      }
    );
    return res.json(tagRouteData);
  } catch (err) {
    res.json(err);
  }
  // create a new tag
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  const tagRouteData = await models.Tag.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.json(tagRouteData);
});

module.exports = router;
