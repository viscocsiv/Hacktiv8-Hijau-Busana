const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller');

router.get("/login", (req, res) => {
    res.render('login');
});

router.post("/login", Controller.login);

router.get('/dashboard', Controller.showDashboard)

module.exports = router;
