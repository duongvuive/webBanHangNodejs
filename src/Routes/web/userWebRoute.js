const express = require('express');
const router = express.Router();
router.get('/login',(req, res) => {
    res.render('loginView.ejs');
});
router.get('/register',(req,res)=>{
        res.render('registerView.ejs');
    } );
router.get('/home',(req, res) => {
        res.render('home.ejs');
});
    module.exports = router;