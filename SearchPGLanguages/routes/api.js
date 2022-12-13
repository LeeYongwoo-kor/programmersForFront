var express = require("express");
const { cache } = require("../util/cache/cache");
const { fetchedAllLanguages } = require("../src/api/api");
var router = express.Router();

const asyncHandler = (func) => (req, res, next) => {
  Promise.resolve(func(req, res, next)).catch(next);
};

const sortApi = (data, keyword) => {
  const keywordUpperCase = keyword.toUpperCase();

  return [...data].sort((a, b) => {
    const elementA = a.ProgrammingLanguage.toUpperCase();
    const elementB = b.ProgrammingLanguage.toUpperCase();

    const isStartKeywordA = elementA.startsWith(keywordUpperCase);
    const isStartKeywordB = elementB.startsWith(keywordUpperCase);

    if (!(isStartKeywordA && isStartKeywordB)) {
      if (isStartKeywordA) {
        return -1;
      }
      if (isStartKeywordB) {
        return 1;
      }
    }
    if (elementA < elementB) {
      return -1;
    }
    if (elementB < elementA) {
      return 1;
    }

    return 0;
  });
};

const sliceApi = (data, limit) => {
  return data.slice(0, limit);
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
  const limit = req.query.limit;
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

  let sortedResult = sortApi(result, keyword);

  if (limit) {
    sortedResult = sliceApi(sortedResult, limit);
  }

  cache[req.originalUrl] = sortedResult;
  res.status(200).json(sortedResult);
});

module.exports = router;
