var Product = require('../models/product');

var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/shoppingcart';

    //mongoose mpromises have been depreciated
    mongoose.Promise = global.Promise;

    mongoose.connect(dbURI);

    mongoose.connection.on('connected', function () {
        console.log('Mongoose default connection open to ' + dbURI);
    });

    // If the connection throws an error
    mongoose.connection.on('error', function (err) {
        console.log('Mongoose default connection error: ' + err);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });


var products = [
    new Product({
        imagePath: 'http://static.giantbomb.com/uploads/scale_small/12/128291/1837361-gothic__cdcovers_cc__front.jpg',
        title: 'Gothic Video Game 1',
        description: 'Awesome game !!!',
        price: 100
    }),
    new Product({
        imagePath: 'http://static.giantbomb.com/uploads/scale_small/12/128291/1837361-gothic__cdcovers_cc__front.jpg',
        title: 'Gothic Video Game 2',
        description: 'Awesome game !!!',
        price: 200
    }),
    new Product({
        imagePath: 'http://static.giantbomb.com/uploads/scale_small/12/128291/1837361-gothic__cdcovers_cc__front.jpg',
        title: 'Gothic Video Game 3',
        description: 'Awesome game !!!',
        price: 300
    }),
];

var done = 0;

for (var i=0 ; i< products.length ; i++){
    products[i].save(function(){
        done++;
        if(done === products.lengths){
            exit();
        }
    }); // Asyn
}

function exit(){
    mongoose.disconnect();
}
