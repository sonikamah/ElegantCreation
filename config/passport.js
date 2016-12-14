var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

// used to serialize the user for the session
passport.serializeUser(function(user , done){
    done(null , user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id , done){
    User.findById(id , function(err , user){
        done(err , user);
    });
});

passport.use('local.signup' , new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
} , function(req , email , password , done){

    //req.checkBody('email' , 'InValid Email').notEmplty().isEmail();
    //req.checkBody('password' , 'InValid passowrd').notEmpty().isLength({min: 4});

    var errors = req.validationErrors();

    if(errors){
        errors.forEach(function(error){
            messages.push(error.msg);
        });
        return done(null , false , req.flash('error' , messages));
    }

    User.findOne({'email': email} , function(err , user) {
        if(err){
            return done(err);
        }
        if(user){ // if user already exist
            return done(null , false , {message: "Email is already in user"})
        }

        var newUser = new User();
        newUser.email = email;
        newUser.password = password // newUser.encyrptPassword(password);
        newUser.save(function(err , result){
            if(err){
                return done(err);
            }
            return done(null , newUser);
        });
    });
}));




passport.use('local.signin' , new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
} , function(req , email , password , done){
    //req.checkBody('email' , 'InValid Email').notEmplty().isEmail();
    //req.checkBody('password' , 'InValid passowrd').notEmpty().isLength({min: 4});
    
    var errors = req.validationErrors();
    if(errors){
        errors.forEach(function(error){
            messages.push(error.msg);
        });
        return done(null , false , req.flash('error' , messages));
    }

    User.findOne({'email': email} , function(err , user) {
        if(err){
            return done(err);
        }
        if(!user){ // if user already exist
            return done(null , false , {message: "no user found"})
        }

        // valid password not working install bcrypt .
        // if(!user.validPassword(password)){
        //     return done(null , false , { message: 'wrong password ...' });
        // }

        return done(null , user);
    });
}))