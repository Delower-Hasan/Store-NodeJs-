const router = require('express').Router()
const signUpValidate = require('../validator/auth/signUp')
const loginValidate = require('../validator/auth/loginValidate')
const {
    getSignUp,
    postSignUp,
    getLogin,
    postLogin,
    logOut,
} = require('../controllers/authController')
const {isUnAuthinticate}= require('../middlewares/authinticate')

router.get('/signUp',isUnAuthinticate,getSignUp)
router.post('/signUp', signUpValidate,postSignUp)
router.get('/login',isUnAuthinticate,getLogin)
router.post('/login',loginValidate,postLogin)
router.get('/logOut',logOut)


module.exports = router