const Catagory = require('../models/Catagory')
const SubCatagory = require('../models/SubCatagory')

exports.getSubcatagory = async(req, res, next) => {
    const subCat = await SubCatagory.find().populate('catId');

    const AllCat = await Catagory.find();
    res.render('backend/dashboard/subCatagory', {
        flashMessage: {},
        AllCat,
        subCat
    })
}

exports.postSubCatagory = async(req, res, next) => {
    const { catId, subCat } = req.body
    if (subCat) {
        try {
            let subcat = new SubCatagory({
                catId,
                subCat
            })
            let subCatagory = await subcat.save();


            await Catagory.findOneAndUpdate({ _id: catId }, {
                $push: {
                    subCatId: subCatagory._id
                }
            })
            return res.redirect('/subCatagory')

        } catch (error) {
            next(error)

        }
    }
}

exports.editSubCat = async(req, res, next) => {
    const { subcatId, catId, subCat } = req.body
    if (subCat) {
        try {
            await SubCatagory.findOneAndUpdate({ _id: subcatId }, {
                $set: { catId, subCat }
            })
            return res.redirect('/subCatagory');
        } catch (error) {
            next(error)
        }
    }
}

exports.deleteSubCat = async(req, res, next) => {
    const { id } = req.params;
    await Catagory.findOneAndUpdate({ subCatId: id }, {
        $pull: {
            subCatId: id
        }
    })

    await SubCatagory.findOneAndDelete({ _id: id })
    return res.redirect('/subCatagory');
}

exports.ajaxSubCat = async(req, res, next) => {
    console.log(req.params)
    return console.log('from constoler')
}