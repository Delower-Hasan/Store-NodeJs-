const {body} = require('express-validator')
const User = require('../../models/User')


module.exports = [
    body('userName')
    .not().isEmpty().withMessage('UserName Cant be Empty')
    .trim(),
    body('email')
    .not().isEmpty().withMessage('Email Cant be Empty')
    .normalizeEmail()
    .custom(async (em,{req})=>{
        let user = await User.findOne({email:req.body.email})
        if(user){
            throw new Error('Sorry!! This user is Exist already')
        }
        return false
    })
    ,
    body('password')
    .not().isEmpty().withMessage('Password cant be Empty'),
    body('confirmPassword')
    .custom((pass,{req})=>{
        if(pass != req.body.password){
            throw new Error('Password Doesnt match')
        }
        return true
    }),
    body('isChecked')
    .not().isEmpty().withMessage('You must be agree')


    
]