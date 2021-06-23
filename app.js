const express = require("express");
const app = express();
const path = require("path");
const ejs = require('ejs');
const Product = require("./models/product");
const seedDB = require("./seedDB");

const session = require('express-session');


const passport = require('passport');

//this is for requiring the passport-local strategy
const LocalStrategy = require('passport-local');

const User = require("./models/user");



//Requiring the routes that you have written in the product.js file inside the routes folder
//this is for the product routes
const productRoutes = require("./routes/products/product");

//this is for the review routes
const reviewRoutes = require('./routes/reviews/review');

//this is for the Authentication
const authRoutes = require('./routes/auth/auth');

//this is for cart routes
const cartRoutes = require('./routes/cart/cart'); 

const methodOverride = require('method-override')
const mongoose = require('mongoose');





//mongoose configuration
mongoose.connect('mongodb://localhost/shopApp',
 {useNewUrlParser: true, 
  useUnifiedTopology: true , 
  useFindAndModify : false ,
  useCreateIndex : true
})
.then(()=>
{
    console.log("DATABASE CONNECTION OPEN");
})
.catch((err)=>
{
    console.log(" DATABASE CONNECTION ERROR");
    console.log(err);
})

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);





app.set('view engine' , "ejs");

app.set("views", path.join(__dirname,'/views'));

app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));

app.use(methodOverride('_method'));



//configuration of for using Session
app.use(session({
    secret: 'thisIsNotaGoodSecret',
    resave: false,
    saveUninitialized: true
    
  }))

//PASSPORT.js config

//below these middlewares are required to use passport.js
//with this below we are initializing the passport.js
app.use(passport.initialize());

//with this now passport will be able to  use the sessions that we have configured
app.use(passport.session());




//here we are telling the we wil be using the Local-Strategy of passport
// and User.authenticate() : - authenticate() it generates a function that is used in passport-local strategy
// which will basically authenticate the User model that we have defined
//so here it basically means that we are authenticating the User that will be created
passport.use(new LocalStrategy(User.authenticate()));


//serializing and deserializing user
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());






//Calling this function just once  to seed our databse
// seedDB();






//This is the Root Route where the landing PAGE WILL BE SHOWN
app.get("/",(req,res)=>
{
    res.render("landingPage");
})


//GLOBALLY AVAILABLE TO FRONTEND
// making some information globally available to our templates(frontend)
app.use((req,res,next )=> { 
   // when we set something in the locals property it is globally available to our front end and it persists until the lifetime of that request
   // in simple words now the curresnt logged in users information will become accessible to our FrontEnd
   res.locals.currentUser=req.user;
   next();
})






//ROUTES

//Now here we are configuring the main application to use routes (to handle requests) that we have written in the productRoutes
app.use(productRoutes)
//////-------------------------.....>>>>>>>>
app.use(reviewRoutes);

app.use(authRoutes);

app.use(cartRoutes);



app.listen(3000 , ()=>{

    console.log("Server started at PORT 3000");
})