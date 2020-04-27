const router = require('express').Router()
const { isAuthinticate } = require('../middlewares/authinticate')
const {
    getSubcatagory,
    postSubCatagory,
    editSubCat,
    deleteSubCat,
    ajaxSubCat,



} = require('../controllers/subCatagoryController')
router.get('/', isAuthinticate, getSubcatagory)
router.post('/subcat', isAuthinticate, postSubCatagory)
router.post('/edit', isAuthinticate, editSubCat)
router.get('/delete/:id', isAuthinticate, deleteSubCat)
router.get('/ajaxSubCat/:id', isAuthinticate, ajaxSubCat)
module.exports = router