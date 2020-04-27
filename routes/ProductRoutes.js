const router = require('express').Router()
const { isAuthinticate } = require('../middlewares/authinticate')
const upload = require('../middlewares/uploadMiddleWare')
const {
    getAllProduct,
    postProduct,
    viewProduct,
    deleteProduct,
    ajaxSubCat,
    editProduct,
    // frontend
   


} = require('../controllers/ProductController')

router.get('/', isAuthinticate, getAllProduct)
router.post('/post', isAuthinticate, upload.array('productImage', 5), postProduct)
router.get('/view', isAuthinticate, viewProduct)
router.get('/delete/:id', isAuthinticate, deleteProduct)
router.get('/ajaxSubCat/:id', isAuthinticate, ajaxSubCat)
router.post('/edit', isAuthinticate, upload.array('productImage', 5), editProduct)



module.exports = router