
const User = require('../models/User')

exports.bindUserWithRequest = () => {
    return async (req, res, next) => {
        if (!req.session.isLoggedIn) {
           return next()
        }

        try {
            let user = await User.findById(req.session.user._id)
            req.user = user
            next()
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

exports.isAuthinticate =(req,res,next)=>{
    if(!req.session.isLoggedIn){
        return res.redirect('/auth/login')
    }
    return next()
}


exports.isUnAuthinticate = (req,res,next)=>{
    if(req.session.isLoggedIn){
        return res.redirect('/dashboard')
    }
    return next()
}