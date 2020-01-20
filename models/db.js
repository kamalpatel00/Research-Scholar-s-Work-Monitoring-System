const mongoose = require("mongoose");

// Function to connect MongoDB, And 1st parameter is pass the URL for the Database
// single call back function - err to ensure connectivity status
mongoose.connect(
  "mongodb://localhost:27017/PhDstudentDB",
  { useNewUrlParser: true },
  err => {
    if (!err) {
      console.log("MongoDB connected Succeeded.");
    } else {
      console.log("Error in DB connection : " + err);
    }
  }
);

require("./school.model");
require("./department.model");
require("./teacher.model");
require("./school_Department.model");
require("./student.model");
require("./studentHome.model");
require("./studentLogin.model");
require("./studentAuth.model");
require("./studentReport.model");
require("./studentReport.model");
require("./studentSupervisior.model");
require("./teacherAuth.model");
require("./teacherLogin.model");
require("./researchCommittee.model");
require("./drcCrc.model");
require("./doctoralCommittee.model");
require("./bet.model");
require("./adminAuth.model");
require("./adminLogin.model");
require("./studentFilter.model");
require("./studentFilterType.model");
require("./studentFilterSem.model");
