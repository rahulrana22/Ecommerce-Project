const mongoose = require("mongoose");

const Product = require("./models/product");

const arr= [
   
{
    name:"IPhone",
    img: "https://images.unsplash.com/photo-1512054502232-10a0a035d672?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aXBob25lfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=60",
    price:9000,
    desc: "A14 Bionic, the fastest chip in a smartphone. An edge-to-edge OLED display. Ceramic Shield with four times better drop performance. And Night mode on every camera. iPhone 12 has it all — in two perfect sizes."
},

{
    name:"Macbook Pro",
    img: "https://images.unsplash.com/photo-1501163268664-3fdf329d019f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    price:250000,
    desc: "The MacBook Pro is a line of Macintosh portable computers introduced in January 2006 by Apple Inc. It is the higher-end model of the MacBook family, sitting above the consumer-focused MacBook Air, and is sold with 13- and 16-inch screens. 17-inch and 15-inch version were sold from April 2006 to June 2012 and January 2006 to January 2020, respectively."
 },
 {
    name:"Apple Watch",
    img: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=282&q=80",
    price:12000,
    desc: "The MacBook Pro is a line of Macintosh portable computers introduced in January 2006 by Apple Inc. It is the higher-end model of the MacBook family, sitting above the consumer-focused MacBook Air, and is sold with 13- and 16-inch screens. 17-inch and 15-inch version were sold from April 2006 to June 2012 and January 2006 to January 2020, respectively."
 },

 {
    name:"Nike Sneakers",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    price:270,
    desc: "Nike, Inc. (/ˈnaɪki/ or /ˈnaɪk/)[note 1] is an American multinational corporation that is engaged in the design, development, manufacturing, and worldwide marketing and sales of footwear, apparel, equipment, accessories, and services. The company is headquartered near Beaverton, Oregon, in the Portland metropolitan area."
 }
];


async function seedDB(){

    const data  = await Product.insertMany(arr);

   console.log(data);
}

module.exports = seedDB;