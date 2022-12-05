var express = require("express");
const { fetchedLanguages } = require("../src/api/api");
var router = express.Router();

const asyncHandler = (func) => (req, res, next) => {
  Promise.resolve(func(req, res, next)).catch(next);
};

router.use(
  asyncHandler(async function (req, res, next) {
    req.fetchedLanguages = await fetchedLanguages();
    next();
  })
);

/* GET home page. */
/**
 * @path {GET}
 * @description home
 */
router.get("/", function (req, res, next) {
  console.log(req.fetchedLanguages);
  res.status(200).json(req.fetchedLanguages);
});

module.exports = router;
