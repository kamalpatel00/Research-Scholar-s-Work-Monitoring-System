//root file

require("./models/db");

const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const bodyparser = require("body-parser");
// var bodyParser = require("body-parser");
var urlencodedParser = bodyparser.urlencoded({
  extended: false
});

//mocs
var app = express();
var multer = require("multer");
// var cors = require('cors');

//Add request statement
const schoolController = require("./controllers/schoolController");
const departmentController = require("./controllers/departmentController");
const teacherController = require("./controllers/teacherController");
const school_DepartmentController = require("./controllers/school_DepartmentController");
const studentController = require("./controllers/studentController");
const studentHomeController = require("./controllers/studentHomeController");
const studentLoginController = require("./controllers/studentLoginController");
const studentAuthController = require("./controllers/studentAuthController");
const studentReportController = require("./controllers/studentReportController");
const studentSupervisiorController = require("./controllers/studentSupervisiorController");
const upload = require("./controllers/uploadController");
const downloadController = require("./controllers/downloadController");
const teacherAuthController = require("./controllers/teacherAuthController");
const teacherLoginController = require("./controllers/teacherLoginController");
const researchCommitteeController = require("./controllers/researchCommitteeController");
const drcCrcController = require("./controllers/drcCrcController");
const doctoralCommitteeController = require("./controllers/doctoralCommitteeController");
const betController = require("./controllers/betController");
const adminAuthController = require("./controllers/adminAuthController");
const adminLoginController = require("./controllers/adminLoginController");
const studentFilterController = require("./controllers/studentFilterController");
const studentFilterTypeController = require("./controllers/studentFilterTypeController");
const studentFilterSemController = require("./controllers/studentFilterSemController");
//Call express function with the Variable app
var app = express();
app.use(
  bodyparser.urlencoded({
    extended: true
  })
);
app.use(bodyparser.json());

//In join function the 1st parameter is (__dirname) reserved inside the node js appplications
//it is base file directory path
app.set("views", path.join(__dirname, "/views/"));

//Configure the Express Engine handle bars
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "mainLayout",
    layoutsDir: __dirname + "/views/layouts/"
  })
);

//app.engine('hbs', exphbs({extname: 'hbs', defaultLayout: 'deptLayout', layoutsDir: __dirname + '/views/layouts/'}));
//set view engine as hbs
app.set("view engine", "hbs");

//To starts server we call listen function from app variable
//1st parameter port number, 2nd is call back function
app.listen(3000, () => {
  console.log("Server started at port : 3000");
});

app.get("/", (req, res) => {
  res.render(__dirname + "/test.hbs");
});

//Add a route for schoolController we call 'use' middleware function
//Configure the route for node js application
app.use("/school", schoolController);
app.use("/department", departmentController);
app.use("/teacher", teacherController);
app.use("/school_Department", school_DepartmentController);
app.use("/student", studentController);
app.use("/studentHome", studentHomeController);
app.use("/studentLogin", studentLoginController);
app.use("/studentAuth", studentAuthController);
app.use("/studentReport", studentReportController);
app.use("/studentSupervisior", studentSupervisiorController);
app.use("/download", downloadController);
app.use("/teacherAuth", teacherAuthController);
app.use("/teacherLogin", teacherLoginController);
app.use("/researchCommittee", researchCommitteeController);
app.use("/drcCrc", drcCrcController);
app.use("/doctoralCommittee", doctoralCommitteeController);
app.use("/bet", betController);
app.use("/adminAuth", adminAuthController);
app.use("/adminLogin", adminLoginController);
app.use("/studentFilter", studentFilterController);
app.use("/studentFilterType", studentFilterTypeController);
app.use("/studentFilterSem", studentFilterSemController);
// app.use("/upload", upload);
// app.use(cors());

// app.post("/upload", urlencodedParser, (req, res) => {
// console.log("Server file");
// let rFile = req.body;
// console.log(req.reg);
// res.end(req.body);
// });
