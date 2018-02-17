var express = require('express')
var router = express.Router()

router.get('/profile', function (req, res) {

    res.render('profile.html', /*context goes here*/ {
        "title": "Manage Profile"
    }); // <<-- notice the render() function :)
    //have a look at layout.html, index.html inside template, ...
});

router.get('/about', function (req, res) {

    res.render('about.html', /*context goes here*/ {
        title: "Explore",
        layout: 'layout_info'
    });
});

router.get('/input', function (req, res) {

    res.render('input.html', /*context goes here*/ {
        "title": "Input"
    });
});

module.exports = router