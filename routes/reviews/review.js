const express = require('express');
const router = express.Router();
const Product = require('../../models/product');
const Review = require('../../models/review');




// here we are requiring a middleware that we have created that checks if the user is authenticated or not
// in simple words it checks if the user is logged in or not
const {isLoggedIn} = require('../../middleware');










router.post('/products/:id/review',isLoggedIn ,  async(req, res) => {

    const product = await Product.findById(req.params.id);
    
    
    // const review = new Review(req.body.review);
         
    const { rating, body } = req.body.review;

    const { username } = req.user;

    let review = new Review({rating:rating,body:body,username:username});

    product.reviews.push(review);
 
    await review.save();
    await product.save();
    
    console.log(req.body.review)
    res.redirect(`/products/${req.params.id}`);
});


module.exports = router;