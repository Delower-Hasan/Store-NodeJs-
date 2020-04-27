const { Schema, model } = require('mongoose')

const subCatSchema = new Schema({
    catId: {
        type: Schema.Types.ObjectId,
        ref: 'Catagory',
        required: true
    },
    subCat: {
        type: String,
        required: true,
        trim: true
    },
    productId: [{
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }

    ],

})

const SubCatagory = model('SubCatagory', subCatSchema)

module.exports = SubCatagory;