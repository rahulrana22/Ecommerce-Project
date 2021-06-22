//this files handles the route for Cart

const express = require('express');
const router = express.Router();
const Product = require('../../models/product');
const { isLoggedIn } = require('../../middleware');
const User = require('../../models/user');




//this is where we are pushing the selected items into the cart
router.post('/user/:id/cart',isLoggedIn, async(req, res) => {

    const product = await Product.findById(req.params.id);

    const user = req.user;

    user.cart.push(product);

    await user.save();

    res.redirect('/user/cart');
})









//SHOW CART
//this is to SHOW the products that you have added to cart
router.get('/user/cart',isLoggedIn,async(req, res) => {
     
    //first we will find the user
    //and then we will populate the cart (which is a array , we have defined it in the schema ) 
    //with the chosen products 
    const user = await User.findById(req.user._id).populate('cart');
     


    res.render('cart/showcart', { cart: user.cart });
})




//DELETE : deleting the product from the cart
router.delete('/cart/:id/item/:itemId',async(req,res)=>{

    const { id, itemId } = req.params;
    
    // this $pull operator  is from mongodb which removes the values from the array that match the given condition
    
    await User.findByIdAndUpdate(id, { $pull: { cart: itemId } });

    res.redirect('/user/cart');
})


module.exports = router;










module.exports = router;