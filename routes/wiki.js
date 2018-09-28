const express = require('express');
const router = express.Router();
const { addPage, editPage, main, userList, userPages, wikiPage } = require('../views/');
const {Page, User, db} = require('../models/');

router.get('/',(req,res,next) => {
    try {
        res.send('GOT WIKI')
    }
    catch (err) {
        next (err);
    }  
});

router.post('/', async (req, res, next) => {

    // Page.beforeValidate = function (page, options) {
    //     if (!page.slug) page.slug = page.title.replace(/\s+/g, '_').replace(/\W/g, '').toLowerCase();
    //   }

    try {
    const page = await Page.create(req.body);
    console.log(page);
    res.redirect('/');
    }
    catch (err) {
        next (err);
    }  
})
//get add-a-page
router.get('/add/',(req,res,next) => {
    try {
        res.send(addPage());
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;