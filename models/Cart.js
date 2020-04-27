const {Schema,model} = require('mongoose')

const cartSchema = new Schema({
    productId:  {
        type:Schema.Types.ObjectId,
        ref:'Product'
    },
    macAddress:{
        type:String,
    },
    quantity:{
        type:Number,
        default:1
    }
},{
    timestamps:true
})

const Cart = model('Cart',cartSchema);

module.exports = Cart