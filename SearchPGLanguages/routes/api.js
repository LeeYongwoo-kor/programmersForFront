var express = require("express");
const { cache } = require("../util/cache/cache");
const { fetchedLanguages } = require("../src/api/api");
const { getItem, setItem } = require("../util/cache/storage");
var router = express.Router();

const asyncHandler = (func) => (req, res, next) => {
  Promise.resolve(func(req, res, next)).catch(next);
};

router.use(
  asyncHandler(async function (req, res, next) {
    if (!cache[req.baseUrl]) {
      req.fetchedLanguages = await fetchedLanguages();
      cache[req.baseUrl] = req.fetchedLanguages;
    }

    next();
  })
);

/* Get All API. */
/**
 * @path {GET /api}
 * @description Get API by keyword
 */
router.get("/", function (req, res, next) {
  const keyword = req.query.keyword.trim();

  if (!keyword) {
    res.status(404).end();
    return;
  }

  const getStorage = getItem(req.originalUrl);

  if (getStorage) {
    res.status(200).json(getStorage);
    return;
  }

  const result =
    cache[req.baseUrl] &&
    cache[req.baseUrl]?.results.filter((data) =>
      data.ProgrammingLanguage.match(new RegExp(keyword, "i"))
    );

  if (!result || result.length === 0) {
    res.status(404).end();
    return;
  }

  setItem(req.originalUrl, result);
  res.status(200).json(result);
});

module.exports = router;
