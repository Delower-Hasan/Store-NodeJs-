const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    productImage: [{
            type: String,
            required: true
        }

    ],
    productTitle: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        trim: true
    },
    productPrice: {
        type: Number,
        required: true,
        trim: true
    },
    productSummery: {
        type: String,
        required: true,
        trim: true
    },
    productDescription: {
        type: String,
        required: true,
        trim: true
    },
    catId: {
        type: Schema.Types.ObjectId,
        ref: 'Catagory',
        required: true
    },
    subCatId: {
        type: Schema.Types.ObjectId,
        ref: 'SubCatagory',
        required: true
    },
 
}, {
    timestamps: true
})

const Product = model('Product', productSchema);
module.exports = Product;