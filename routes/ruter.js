// filepath: /d:/KP/sistemeud/routes/ruter.js
const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.get("/", (req, res) => {
  res.redirect("/login");
});

// login
const controller1 = require("../controller/conLogin");
router.get("/login", controller1.showLogin);

// dashboard
const controller2 = require("../controller/conDashboard");
router.get("/dashboard", authMiddleware, controller2.showDashboard);

// upload malware
const controller3 = require("../controller/conUpload");
router.get("/upload", authMiddleware, controller3.showUpload);

// analisis
const controller4 = require("../controller/conAnalisis");
router.get("/analisis", authMiddleware, controller4.showAnalisis);

// detail analisis
const controller5 = require("../controller/conDetailAnalisis");
router.get("/detail-analisis", authMiddleware, controller5.showDetailAnalisis);

// riwayat
const controller6 = require("../controller/conRiwayat");
router.get("/riwayat", authMiddleware, controller6.showRiwayat);

// detail riwayat
const controller7 = require("../controller/conDetailRiwayat");
router.get("/detail-riwayat", authMiddleware, controller7.showDetailRiwayat);

module.exports = router;