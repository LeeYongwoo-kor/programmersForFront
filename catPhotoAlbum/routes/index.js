const express = require("express");
const app = express();
const router = express.Router();
const { cats } = require("./util/cats.ts");

app.use(express.json()); // use read json
app.use(express.urlencoded({ extended: true })); // use qs module

/* GET home page. */
/**
 * @path {GET}
 * @description home
 */
router.get("/", function (req, res, next) {
  res.render("index", { title: "index page" });
});

/* GET home page. */
/**
 * @path {GET} /api/cats/
 * @description Get Cats by Root
 */
router.get("/api/cats/", function (req, res, next) {
  const catsByRoot = cats.filter((data) => data.parent === null);

  res.status(200).json(catsByRoot);
});

/* GET home page. */
/**
 * @path {GET} /api/cats/[id]
 * @description Get Cats by id
 */
router.get("/api/cats/:id", function (req, res, next) {
  const nodeId = req.params.id;
  const catsById = cats.filter((data) => data.parent?.id === +nodeId);

  res.status(200).json(catsById);
});

module.exports = router;
