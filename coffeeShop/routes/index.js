const { getProductsImage } = require("./mock/products/index.ts");
var express = require("express");
var router = express.Router();

let products = [];

const asyncHandler = (func) => (req, res, next) => {
  Promise.resolve(func(req, res, next)).catch(next);
};

/* GET home page. */
/**
 * @path {GET}
 * @description home
 */
router.get("/", function (req, res, next) {
  res.render("index", { title: "index page" });
});

router.use(
  "/api/products",
  asyncHandler(async function (req, res, next) {
    if (products.length === 0) {
      products = await getProductsImage();
      console.log("=== Caching of products succeeded! ===");
    }

    next();
  })
);

/* GET Products. */
/**
 * @path {GET} /api/products
 * @description Get Products
 */
router.get("/api/products", function (req, res, next) {
  const data = products.map((data) => {
    const { productOptions, ...rest } = data;
    return rest;
  });

  res.status(200).json(data);
});

/* GET Products Id. */
/**
 * @path {GET} /api/products/[id]
 * @description Get Products by id
 */
router.get("/api/products/:id", function (req, res, next) {
  const nodeId = req.params.id;
  const data = products.find((data) => data.id === +nodeId);

  res.status(200).json(data);
});

module.exports = router;
