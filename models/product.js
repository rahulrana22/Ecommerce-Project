const mongoose = require("mongoose");

const Review = require('./review');
const productSchema = new mongoose.Schema({

    name: {
        type:String,
        required:true
    },

    img:{
        type:String
    },
    price:{
        type:Number,
        min:0
    },
    desc: {
        type:String,
       minLength:10
    },

    // here we will be populating this array of review which contains all object ids of the reviews, 
    //it will be filled from the Review model that we made   
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId ,
            ref:'Review'
        }  
    ]
});


const Product = new mongoose.model('Product', productSchema);


module.exports = Product;