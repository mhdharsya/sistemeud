// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;

const showLogin = require("./ruter")
const showDashboard = require("./ruter")
const showUpload = require("./ruter")
const showAnalisis = require("./ruter")
const showDetailAnalisis = require("./ruter")
const showRiwayat = require("./ruter")
const showDetailRiwayat = require("./ruter")
const server = {}

server.showLogin = showLogin
server.showDashboard = showDashboard
server.showUpload = showUpload
server.showAnalisis = showAnalisis
server.showDetailAnalisis = showDetailAnalisis
server.showRiwayat = showRiwayat
server.showDetailRiwayat = showDetailRiwayat

module.exports = server