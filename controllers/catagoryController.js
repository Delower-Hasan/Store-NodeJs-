const Catagory = require('../models/Catagory')
exports.addCatagory = async(req, res, next) => {
    const catagoryName = await Catagory.find()


    res.render('backend/dashboard/catagory', {
        flashMessage: {},
        allCat: catagoryName
    })

}

exports.postCatagory = async(req, res, next) => {
    const { catName } = req.body;
    if (catName) {
        try {
            const catagory = new Catagory({
                catName
            })
            await catagory.save();

            return res.redirect('/catagory')
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

}

exports.deleteCat = async(req, res, next) => {
    const { id } = req.params
    await Catagory.findOneAndDelete({ _id: id })
    return res.redirect('/catagory')
}
exports.editCat = async(req, res, next) => {
    const { catId, catName } = req.body

    if (catName) {
        try {
            await Catagory.findOneAndUpdate({ _id: catId }, {
                $set: { catName }
            })
            return res.redirect('/catagory')
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

}