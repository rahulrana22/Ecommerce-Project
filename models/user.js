//this user model is created for the USER 

const mongoose = require('mongoose');
const passportLocalMongoose  = require('passport-local-mongoose'); 

const Product = require('./product');

// when you plugin this passport-local-mongoose to your schema it will automatically add all the methods
// required to do authentication.

const userSchema = new mongoose.Schema({

    email:{

        type : String ,
        required:true,
        unique:true
        } ,

        cart :[
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Product'
            }
        ]

})


userSchema.plugin(passportLocalMongoose);


const User  = mongoose.model('User', userSchema);

module.exports  = User;