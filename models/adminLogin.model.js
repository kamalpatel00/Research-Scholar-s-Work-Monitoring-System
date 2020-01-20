const mongoose = require("mongoose");

var adminLoginSchema = new mongoose.Schema({
  uname: {
    type: String
  },
  passsword: {
    type: String
  }
});

mongoose.model("AdminLogin", adminLoginSchema);
