var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var csrfProtection = csrf();
var User = require('../models/user');
var Order = require('../models/order');
var Cart = require('../models/cart');


//all the routes should be protected by csrf protection .
router.use(csrfProtection);

/* User Profile  with middleware 'isLoggedIn'*/
router.get('/profile' , isLoggedIn, function(req , res , next){
    Order.find({ user: req.user } , function(err, orders){
        if(err){
            return res.write('Error!!');
        }

        var cart;
        orders.forEach(function(order){
            //fetch the cart and generate the each cart
            cart =  new Cart(order.cart);
            order.items = cart.generateArray();
        });
        res.render('user/profile' , {orders: orders});
    });
});

/* LogOut */
router.get('/logout' ,function(req , res , next){
    req.logout();
    res.redirect('/');
});


// middleware , so that below route can work without authentication like /signin , /signup but not /profile
router.use('/' , notLoggedIn , function(req, res, next){
    next();
});

/* User Sign Up */
router.get('/signup' , function(req , res , next){
  var messages = req.flash('error');
  res.render('user/signup' , { csrfToken: req.csrfToken() , messages: messages , hasErrors: messages.length > 0 });
});

/* User Sign Up  POST */
router.post('/signup' , passport.authenticate('local.signup' , {
  failureRedirect: '/user/signup',
  failureFlash: true,
}), function(req, res, next){
    // if passport authenticate is Successful
    if(req.session.oldUrl){
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/user/profile');
    }
});


/* User Sign In  GET */
router.get('/signin' , function(req , res , next) {
  var messages = req.flash('error');
  res.render('user/signin' , { csrfToken: req.csrfToken() , messages: messages , hasErrors: messages.length > 0 });
});

/* User Sign In  POST */
router.post('/signin' , passport.authenticate('local.signin' , {
  failureRedirect: '/user/signin',
  failureFlash: true
}),function(req, res, next) {
    // if passport authenticate is Successful
    if(req.session.oldUrl){
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/user/profile');
    }
});


module.exports = router;

// middleware
function isLoggedIn(req , res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req , res, next) {
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}