const mongoose = require("mongoose");

var studentReportSchema = new mongoose.Schema({
  txt: {
    type: String
  }
});

mongoose.model("StudentReport", studentReportSchema);
