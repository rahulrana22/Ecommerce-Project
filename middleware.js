//This file is to authenticate basically that if the user is logged in or not 


//we are making a middlewar basically that will check if the user is logged in or not 
// if yes then he can access all the functionality provided to the user
// but if it is not then he wont be able to create , edit , delete or make a review etc.

module.exports.isLoggedIn = (req, res , next) => {


    //this ".isAuthenticated()" is a method that checks if the user is authenticated or not 

    if(!req.isAuthenticated())
    {
        console.log("You have to login first");
        return res.redirect('/login');
    }
    next();
}


