var express = require("express");
var router = express.Router();

/* GET home page. */
/**
 * @path {GET}
 * @description home
 */
router.get("/", function (req, res, next) {
  res.render("index", { title: "index page" });
});

module.exports = router;
