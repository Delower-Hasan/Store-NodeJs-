const router = require('express').Router()
const {
    GetproductDetails,
    getCartPage,
    SendMessage
}= require('../controllers/HomeController')

const {
CartAdd,
} = require('../controllers/CartController')



router.get('/details/:slug', GetproductDetails)
router.get('/card/', getCartPage)
router.get('/cart/:id', CartAdd)
router.get('/message',SendMessage)
module.exports = router