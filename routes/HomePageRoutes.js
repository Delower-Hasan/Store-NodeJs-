const router = require('express').Router()
const {
    Home,
 
}= require('../controllers/HomeController')
// frontend Routes


router.get('/',Home)

module.exports = router