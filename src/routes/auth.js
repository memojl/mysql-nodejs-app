const express = require('express');
const router = express.Router();

router.get('/registro', (req, res)=>{
    res.render('auth/signup');
});

router.get('/login', (req, res)=>{
    res.render('auth/signin');
});




module.exports = router;