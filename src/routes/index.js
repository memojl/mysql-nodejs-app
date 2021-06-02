const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/', async (req, res) => {
    res.render('index');
});

module.exports = router;