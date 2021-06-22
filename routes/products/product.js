
const express = require("express");
const router = express.Router();

const Product  = require("../../models/product");




// here we are requiring a middleware that we have created that checks if the user is authenticated or not
// in simple words it checks if the user is logged in or not
const {isLoggedIn} = require('../../middleware');






//<-----------------This part is for displaying all products on the home page---------->
//To Get all the products display on the index
router.get("/products",async(req,res)=>
{   
    const products = await Product.find({});
    res.render('products/index',{ products : products});
});




//<---------------In this part we will get a form to make a new Product and then redirect to the home page------> 
//Getting a form for a new product

router.get("/products/new",isLoggedIn,(req,res)=>{

    res.render("products/new");
})


// Creating a new Product
//also checking if the user is logged in or not
router.post("/products", isLoggedIn , async(req,res)=>{
    
    console.log(req.body.product);
      await Product.create(req.body.product);
    
    res.redirect("/products");
});

//<-------------------------------...............------------------------------------>





//<------------for Displaying a particular product------------------------------>

//Showing a particular Product
router.get("/products/:id",async (req,res)=>{
      

    //here we are populating the reviews  from the Review model 
    //whatever the values we are getting is from the form of leaving a review
    // after that will be handled by the review routes

     const foundProduct = await Product.findById(req.params.id).populate('reviews'); 
      res.render("products/show" , {product : foundProduct});
})







//<------------------for Updating a Product------------------------------->

//Getting a form to edit a product

router.get("/products/:id/edit", async(req,res)=>{

const foundProduct = await Product.findById(req.params.id);

res.render("products/edit",{product : foundProduct});

});



//Updating the specific Product using PATCH
router.patch("/products/:id", async(req,res)=>{

    const updatedProduct = await Product.findByIdAndUpdate( req.params.id , req.body.product);
    
    console.log(updatedProduct);

//here after clicking the update button you will again see the post but this time it will be a updated post
    res.redirect(`/products/${req.params.id}`);
    
    });
    

    //<------------------------------------------------------------->
    
    //Deleting a Product

    router.delete("/products/:id",async(req,res)=>{
      
        const deletedProduct = await Product.findByIdAndDelete( req.params.id);
        console.log(deletedProduct);
        res.redirect("/products");
          
    })




module.exports = router;