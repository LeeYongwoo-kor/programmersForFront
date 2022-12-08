var express = require("express");
const { cache } = require("../util/cache/cache");
const { fetchedAllLanguages } = require("../src/api/api");
var router = express.Router();

const asyncHandler = (func) => (req, res, next) => {
  Promise.resolve(func(req, res, next)).catch(next);
};

router.use(
  asyncHandler(async function (req, res, next) {
    if (!cache[req.baseUrl]) {
      cache[req.baseUrl] = await fetchedAllLanguages();
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
  const keyword = req.query.keyword;
  // console.log(Object.keys(cache));

  if (!keyword) {
    res
      .status(404)
      .json({
        notFound: true,
        message: `Not Found: ${res.statusCode}`,
      })
      .end();
    return;
  }

  if (cache[req.originalUrl]) {
    res.status(200).json(cache[req.originalUrl]);
    return;
  }

  const result =
    cache[req.baseUrl] &&
    cache[req.baseUrl]?.results.filter((data) =>
      data.ProgrammingLanguage.match(new RegExp(keyword, "i"))
    );

  if (!result || result.length === 0) {
    res
      .status(404)
      .json({
        notFound: true,
        message: `Not Found: ${res.statusCode}`,
      })
      .end();
    return;
  }

  cache[req.originalUrl] = result;
  res.status(200).json(result);
});

module.exports = router;
