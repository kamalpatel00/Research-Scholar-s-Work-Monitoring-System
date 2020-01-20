const mongoose = require("mongoose");

var studentFilterSchema = new mongoose.Schema({
  stdType: {
    type: String
  },
  sem: {
    type: String
  }
});

mongoose.model("StudentFilter", studentFilterSchema);
