const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/add', (req, res)=>{
    res.render('links/add');
});

router.post('/add', (req, res)=>{
    //res.render('links/add');
});

module.exports = router;