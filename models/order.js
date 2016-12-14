//storing the order in database

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  user: {
      type: Schema.Types.ObjectId , ref: 'IUser'
  },
  cart: {
      type: Object,
      required: true
  },
  address: {
      type: String,
      required: true
  },
  name: {
       type: String,
      required: true
  },
  paymentId:{
       type: String,
      required: true
  }
});

module.exports = mongoose.model('Order' , userSchema);