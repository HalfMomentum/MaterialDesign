var express = require('express')
var router = express.Router()

router.get('/profile', function (req, res) {

    res.render('profile.html', /*context goes here*/ {
        title: "Manage Profile",
    }); // <<-- notice the render() function :)
    //have a look at layout.html, index.html inside template, ...
});

router.get('/', function (req, res) {
    res.render('about.html', /*context goes here*/ {
        title: "Explore",
        layout: 'layout_info'
    });
});
router.get('/about',function(req,res){
    res.redirect('/');
});

router.get('/input', function (req, res) {

    res.render('input.html', /*context goes here*/ {
        "title": "Input"
    });
});

router.get('/support', function (req, res) {

    res.render('support.html', /*context goes here*/ {
        "title": "support",
        layout: 'layout_info'
    });
});
router.get('/feature', function (req, res) {

    res.render('feature.html', /*context goes here*/ {
        "title": "Features",
        layout: 'layout_info'
    });
});

router.get('/pricing', function (req, res) {

    res.render('pricing.html', /*context goes here*/ {
        "title": "Price",
        layout: 'layout_info'
    });
});

router.get('/signin', function (req, res) {

    res.render('login.html', /*context goes here*/ {
        "title": "Login",
        layout:'layout_info'
    });
});

module.exports = router