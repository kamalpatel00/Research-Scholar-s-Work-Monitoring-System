const mongoose = require("mongoose");

var studentFilterSemSchema = new mongoose.Schema({
  sem: {
    type: String
  }
});

mongoose.model("StudentFilterSem", studentFilterSemSchema);
