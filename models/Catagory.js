const { Schema, model } = require('mongoose')

const catSchema = new Schema({
    catName: {
        type: String,
        trim: true,
        required: true
    },
    subCatId: [{
        type: Schema.Types.ObjectId,
        ref: 'SubCatagory'
    }]
}, {
    timestamps: true
})

const Catagory = model('Catagory', catSchema);

module.exports = Catagory;