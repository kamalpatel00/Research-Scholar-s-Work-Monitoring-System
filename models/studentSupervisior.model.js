const mongoose = require("mongoose");

var studentSupervisiorSchema = new mongoose.Schema({
  studentReg: {
    type: String
  },
  sv1: {
    type: String
  },
  sv2: {
    type: String
  },
  sv3: {
    type: String
  },
  sv4: {
    type: String
  },
  sv5: {
    type: String
  },
  sv6: {
    type: String
  },
  sv7: {
    type: String
  },
  sv8: {
    type: String
  }
});

//model function schema name and schema object
mongoose.model("StudentSupervisior", studentSupervisiorSchema);
