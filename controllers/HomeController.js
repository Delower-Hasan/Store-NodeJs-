const Product = require('../models/Product')
const Subcatagory = require('../models/SubCatagory')
const Cart = require('../models/Cart')
exports.Home = async(req,res,next)=>{
        try {
            const products = await Product.find();
            const carts = await Cart.find()
           

            res.render('frontend/pages/index',{
                products,
                carts
            });
            
        } catch (error) {
            console.log(error)
            next(error)
        }
}

// all frontend Controllers
exports.GetproductDetails = async(req,res,next)=>{
   const {slug} = req.params

   try {
       let products = await Product.findOne({slug})
       let subId = products.subCatId
       const subcatagories = await Subcatagory.findOne({_id:subId}).populate('productId')
    //    subcatagories.productId.forEach(x=>{
    //        return console.log(x)
    //    })
       
       res.render('frontend/pages/productDetails',{
           products,
           subcatagories
       });
   } catch (error) {
       console.log(error)
       next(error)

   }
}

exports.getCartPage = async(req,res,next)=>{
    const carts = await Cart.find().populate('productId')
  
    res.render('frontend/pages/cart.ejs',{
        carts
    });
}

exports.SendMessage = async(req,res,next)=>{
 
    try {
        res.render('frontend/pages/contact');
    } catch (error) {
        next(error)
    }
}