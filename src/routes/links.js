const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

//LISTAR
router.get('/', async (req, res)=>{
    const links = await mysqlConnection.query('SELECT * FROM links');
    res.render('links/list', { links });
});

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
    req.flash('success', 'Link Guardado Correctamente');
    res.redirect('/links');
});

//EDITAR
router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const links = await mysqlConnection.query('SELECT * FROM links WHERE id = ?', [id]);
    console.log(links[0]);
    res.render('links/edit', {link: links[0]});
});

router.post('/edit/:id', async(req, res)=>{
    const { id } = req.params;
    const {title,url,description} = req.body;
    const newLink = {
        title,
        url,
        description
    }
    //console.log(newLink);
    await mysqlConnection.query('UPDATE links SET ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Link Editado Correctamente');
    res.redirect('/links');
});

//BORRAR
router.get('/delete/:id', async (req,res)=>{
    const {id} = req.params;//console.log(id);
    await mysqlConnection.query('DELETE FROM links WHERE id = ?', [id]);
    req.flash('success', 'Link Borrado Correctamente');
    res.redirect('/links');
});
module.exports = router;