const Cart = require('../models/Cart')
const macaddress = require('macaddress');
exports.CartAdd = async(req,res,next)=>{
    const {id} = req.params
    try {
        macaddress.one(async function (err, mac) {
            const carts = await Cart.findOne({productId:id},{macAddress:mac}).count()
            if(carts>0){
                await Cart.findOneAndUpdate({productId:id},{
                    $inc:{
                        quantity:1
                    }
                })
            }else{
                const cart = new Cart({
                    productId:id,
                    macAddress:mac,
                    quantity:1                    })
                await cart.save()
            }

        })
    return res.redirect('/');

    } catch (error) {
        console.log(error)
        next(error)
    }

}