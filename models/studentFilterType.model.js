const mongoose = require("mongoose");

var studentFilterTypeSchema = new mongoose.Schema({
  stdType: {
    type: String
  }
});

mongoose.model("StudentFilterType", studentFilterTypeSchema);
