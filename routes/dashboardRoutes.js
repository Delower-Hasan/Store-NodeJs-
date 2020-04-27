const router = require('express').Router()
const {
    getDashboard

}= require('../controllers/dashboardControllers')
const {isAuthinticate}= require('../middlewares/authinticate')

router.get('/',isAuthinticate,getDashboard)



module.exports = router