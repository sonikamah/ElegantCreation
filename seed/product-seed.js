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
        imagePath: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS_4ye0RYY_XUS6_Ov90iSppIa7VT8zoF_FP-4YkN-iBaYS9eM4',
        title: 'Silver Suit',
        description: 'Made of Silk ',
        price: 100
    }),
    new Product({
        imagePath: 'https://images-eu.ssl-images-amazon.com/images/I/51-mQ+KEZUL._AC_UL260_SR200,260_.jpg',
        title: 'Golden Suit',
        description: 'Made of Shiphon',
        price: 23
    }),
    new Product({
        imagePath: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTZeQl8P4SKCjygys1Yq4FMnySxgoe0elGKJpiN9Lzq0hbyJBqrSw',
        title: 'Orange Suit',
        description: 'Made of Cottan',
        price: 45
    }),
    new Product({
        imagePath: 'http://www.fashionfemina.com/blog/wp-content/uploads/2015/09/black-salwar-suit.jpg',
        title: 'Orange Suit',
        description: 'Made of SilkCottan',
        price: 12
    }),
    new Product({
        imagePath: 'http://vanani.com/wp-content/uploads/2016/01/bollywood-shraddha-kapoor-red-beige-faux-georgette-anarkali-salwar-kameez-suit-vanani.jpg',
        title: 'Orange Suit',
        description: 'Made of cottan',
        price: 25
    }),
    new Product({
        imagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNmG5zAzr2DzEDJPcEtakilryU_WhdEqjgW92CnOstsvijv8qh1A',
        title: 'Orange Suit',
        description: 'Made of Silk',
        price: 20
    }),
    new Product({
        imagePath: 'http://www.metromela.com/wp-content/uploads/2013/10/Wedding-salwar-suit.jpg',
        title: 'Orange Suit',
        description: 'Made of Juite',
        price: 10
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
