// filepath: /d:/KP/sistemeud/routes/ruter.js
const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.get("/", (req, res) => {
  res.redirect("/login");
});

// chart
const { getDashboardData } = require("../controller/conChart");
router.get("/chart", authMiddleware, getDashboardData);

// login
const controller1 = require("../controller/conLogin");
router.get("/login", controller1.showLogin);
router.post('/login', controller1.authController.login);
router.get('/logout', controller1.authController.logout);

const controller16 = require("../controller/conRegis");
router.get("/register", controller16.regcon.showRegis);
router.post("/register", controller16.regcon.register);

// isi email
const controller12 = require("../controller/conForgot");
router.get("/forgotPassword", controller12.showForgot);

// menampilkan pemberitahuan email dikirim
const controller13 = require("../controller/conWait");
router.get("/wait", controller13.showWait);

// menampilkan form isi password baru
const controller14 = require("../controller/conReset");
router.get("/reset", controller14.showReset);

// dashboard
const controller2 = require("../controller/conDashboard");
router.get("/dashboard", authMiddleware, controller2.showDashboard);

// upload malware
const uploadController = require("../controller/conUpload");
router.get("/upload", authMiddleware, uploadController.showUpload);
router.post("/upload", authMiddleware, upload, uploadController.uploadMalware);

// analisis
const controller4 = require("../controller/conAnalisis");
router.get("/analisis", authMiddleware, controller4.showAnalisis);

// detail analisis
const controller5 = require("../controller/conDetailAnalisis");
router.get("/detail-analisis", authMiddleware, controller5.showDetailAnalisis);
router.put("/detail-analisis/:id", authMiddleware, controller5.updateAnalysisResult);
router.post("/detail-analisis", authMiddleware, controller5.createAnalysisResult);

// riwayat
const controller6 = require("../controller/conRiwayat");
router.get("/riwayat", authMiddleware, controller6.showRiwayat);

// detail riwayat
const controller7 = require("../controller/conDetailRiwayat");
router.get("/detail-riwayat", authMiddleware, controller7.showDetailRiwayat);

module.exports = router;