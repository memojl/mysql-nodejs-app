const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

//AGREGAR
router.get('/add', (req, res)=>{
    res.render('links/add');
});

router.post('/add', async (req, res)=>{
    const {title,url,description} = req.body;
    const newLink = {
        title,
        url,
        description
    }
    //console.log(newLink);
    await mysqlConnection.query('INSERT INTO links set ?', [newLink]);
    //req.flash('success', 'Link Saved Successfully');
    res.redirect('/links');
});

//LISTAR
router.get('/', async (req, res)=>{
    const links = await mysqlConnection.query('SELECT * FROM links');
    res.render('links/list', { links });
});


//EDITAR
router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const links = await mysqlConnection.query('SELECT * FROM links WHERE id = ?', [id]);
    console.log(links);
    res.render('links/edit', {link: links[0]});
});

module.exports = router;