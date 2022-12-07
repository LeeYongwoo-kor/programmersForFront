var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var apiRouter = require("./routes/api");

var app = express();

var envResult = require("dotenv").config();
if (envResult.error) {
  throw new envResult.error();
}

// view engine setup
app.set("views", path.join(__dirname, "pages"));
app.engine("html", require("ejs").renderFile); // for html
app.set("view engine", "html");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", apiRouter);
app.use("/src", express.static(path.join(__dirname, "src")));
app.use("/dist", express.static(path.join(__dirname, "dist")));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), function () {
  console.log("Server started on port : " + app.get("port"));
});

module.exports = app;
