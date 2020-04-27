const router = require('express').Router()
const { isAuthinticate } = require('../middlewares/authinticate')
const {
    addCatagory,
    postCatagory,
    deleteCat,
    editCat

} = require('../controllers/catagoryController')

router.get('/', isAuthinticate, addCatagory)
router.post('/addCat', isAuthinticate, postCatagory)
router.get('/delete/:id', isAuthinticate, deleteCat)
router.post('/edit', isAuthinticate, editCat)

module.exports = router