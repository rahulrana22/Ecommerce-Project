//this file contains route for the authentucation part

const express = require("express");
const router = express.Router();

const User  = require("../../models/user");

const passport = require('passport');


//SIGNUP PAGE : for filling the credentials at the sign up form
router.get('/register',(req,res)=>{

    res.render('auth/signup');
})




// Post request sent by the SIGNUP form

router.post('/register', async(req,res)=>{
     
     // we are basically creating the structure of the user
     // and the values we are getting is in the req object from the signUp form

     const user = {
             
        username : req.body.username , 
        email : req.body.email
     }
   

     // this " .register()" mthod is provided by the passport-local-mongoose to register a new user
     // we are passing the user and also along with the password in the parameters
     
     const newUser =  await User.register(user , req.body.password);


    res.redirect('/login');
})






//Login Page : - this route is for the login page

router.get('/login' , (req,res)=>{
  
    res.render('auth/login');
})



//POST request from the login Page

//through this we are actually logging in the the user if he is registered already
//here we are using the "authenticate" function provided by passport
router.post('/login' , passport.authenticate('local' , {failureRedirect : '/login'}), (req,res)=>{
    
    console.log("Login Success");
    // console.log(req.user);
    res.redirect('/products');
})



//For Log Out

router.get('/logout' , (req , res)=>
{
    req.logout();

    res.redirect('/login');
})




module.exports = router;