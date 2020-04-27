const Subcatagory = require('../models/SubCatagory');
const Product = require('../models/Product');
const Catagory = require('../models/Catagory')
const flash = require('../utils/Flash')
const fs = require('fs')
exports.getAllProduct = async(req, res, next) => {
    let catagories = await Catagory.find();
    res.render('backend/dashboard/add-product', {
        flashMessage: {},
        catagories,
    })
}
exports.postProduct = async(req, res, next) => {
    const files = req.files
    const {
        productTitle,
        slug,
        productPrice,
        productSummery,
        productDescription,
        subCatId,
        catId
    } = req.body



    if (files.length > 0) {
        let productImage = []
        files.forEach(img => {
            productImage.push(img.filename)
        })

        try {
            const product = new Product({
                productImage,
                productTitle,
                slug,
                productPrice,
                productSummery,
                productDescription,
                subCatId,
                catId
            })
            let productId = await product.save();
            await Subcatagory.findOneAndUpdate({ _id: subCatId }, {
                $push: { productId }
            })
            return res.redirect('/product/view');
        } catch (error) {
            next(error)
        }

    }

}

exports.viewProduct = async(req, res, next) => {
    const productAll = await Product.find()
        .populate('subCatId')
        .populate('catId')
        .exec()
    let catagories = await Catagory.find()
    try {

        res.render('backend/dashboard/viewProduct', {
            flashMessage: {},
            productAll,
            catagories
        });

    } catch (error) {
        next(error)
    }

}

exports.deleteProduct = async(req, res, next) => {
    const { id } = req.params;
    try {
        const product = await Product.findOne({ _id: id })
        product.productImage.forEach(img => {
            fs.unlink('public/uploads/' + img, err => {
                if (err) {
                    console.log(err)
                }
            })
        })
        await Product.findOneAndDelete({ _id: id });
        await Subcatagory.findOneAndUpdate({ productId: id }, {
            $pull: {
                productId: id
            }
        })
        return res.redirect('/product/view');

    } catch (error) {
        console.log(error)
        next(error)
    }

}

exports.ajaxSubCat = async(req, res, next) => {
    try {
        const { id } = req.params;
        const subCat = await Catagory.findOne({ _id: id }).populate('subCatId')
        res.json(subCat.subCatId)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.editProduct = async(req, res, next) => {
    const files = req.files
    const {
        editId,
        productTitle,
        slug,
        productPrice,
        productSummery,
        productDescription,
        subCatId,
        catId,
    } = req.body

    let productImage = []
    if (files.length > 0) {
        files.forEach(img => {
            productImage.push(img.filename)
        })
    }
    try {
        if(productImage.length>0){
            const product = await Product.findOne({ _id: editId })
            product.productImage.forEach(img => {
                fs.unlink('public/uploads/' + img, err => {
                    if (err) {
                        console.log(err)
                    }
                })
            })
                await Product.findOneAndUpdate({_id:editId},{
                    $set:{
                        productImage,
                       productTitle ,
                       productTitle,
                       slug,
                       productPrice,
                       productSummery,
                       productDescription,
                       subCatId,
                       catId,
                    }
                })
                return  res.redirect('/product/view');
        }
     
        await Product.findOneAndUpdate({_id:editId},{
            $set:{
            
               productTitle ,
               productTitle,
               slug,
               productPrice,
               productSummery,
               productDescription,
               subCatId,
               catId,
            }
        })
        return  res.redirect('/product/view');
    

        
    } catch (error) {
        next(error)
    }
   

}


