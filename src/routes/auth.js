const express = require('express');
const router = express.Router();

//REGISTRO-FORM
router.get('/registro', (req, res)=>{
    res.render('auth/signup');
});

router.post('/registro', (req, res)=>{
    console.log(req.body);
    res.send('Recibido');
});

//LOGIN-FORM
router.get('/login', (req, res)=>{
    res.render('auth/signin');
});




module.exports = router;