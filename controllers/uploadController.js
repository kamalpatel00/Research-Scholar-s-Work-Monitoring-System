const express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

router.post("/", urlencodedParser, (req, res) => {
  let rFile = req.body;
  console.log(rFile);
  res.json(req.body);
  res.end(req.body.txt);
});

module.exports = router;
