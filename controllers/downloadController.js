const express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

router.get("/", urlencodedParser, (req, res) => {
  let fName = req.body;
  console.log(fName);
  res.download(__dirname + "/uploads/" + req.body.text);
});

router.post("/", async function(req, res) {});

module.exports = router;
