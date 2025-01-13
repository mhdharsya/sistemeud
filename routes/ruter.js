const express = require("express");
const router = express.Router();

// login
const controller1 = require("../controller/conLogin");
router.get("/login", /*middleware.verifyToken,*/ controller1.showLogin);

// dashboard
const controller2 = require("../controller/conDashboard");
router.get("/dashboard", /*middleware.verifyToken,*/ controller2.showDashboard);

// upload malware
const controller3 = require("../controller/conUpload");
router.get("/upload", /*middleware.verifyToken,*/ controller3.showUpload);

// analisis
const controller4 = require("../controller/conAnalisis");
router.get("/analisis", /*middleware.verifyToken,*/ controller4.showAnalisis);

// input detail analisis
const controller5 = require("../controller/conDetailAnalisis");
router.get("/detailAnalisis", /*middleware.verifyToken,*/ controller5.showDetailAnalisis);

// riwayat
const controller6 = require("../controller/conRiwayat");
router.get("/riwayat", /*middleware.verifyToken,*/ controller6.showRiwayat);

// detail malware di riwayat
const controller7 = require("../controller/conDetailRiwayat");
router.get("/detailRiwayat", /*middleware.verifyToken,*/ controller7.showDetailRiwayat);

module.exports = router;