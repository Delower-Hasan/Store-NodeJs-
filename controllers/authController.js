const {validationResult} = require('express-validator')
const validateMsz = require('../utils/validateMsz')
const User = require('../models/User')
const flash = require('../utils/Flash')


exports.getSignUp = (req,res,next)=>{
    res.render('backend/auth/signUp',{
        error:{},
        flashMessage:{},
    })
}

exports.postSignUp = async (req,res,next)=>{
     const {userName,email,password} = req.body
     let error = validationResult(req).formatWith(validateMsz)
  
    if(!error.isEmpty()){
        req.flash('fail','Give Correct Credential')
       return res.render('backend/auth/signUp',{
            error:error.mapped(),
            flashMessage:flash.getMessage(req)
           
        })
    }
    try {
        let user = new User({
            userName,
            email,
            password,
          
        })
        await user.save()
        req.flash('success','Successfully registerd')
        return res.render('backend/auth/login',{
            flashMessage:flash.getMessage(req)
        })
        
    } catch (e) {
        console.log(e)
        next(e)
    }
 


    
}

exports.getLogin =(req,res,next)=>{
    return res.render('backend/auth/login',{
        error:{},
        flashMessage:{}
    })
}


exports.postLogin = async (req,res,next)=>{

   const {email,password} = req.body

   let error = validationResult(req).formatWith(validateMsz)
  
   if(!error.isEmpty()){
       req.flash('fail','Give Correct Credential')
      return res.render('backend/auth/login',{
           error:error.mapped(),
           flashMessage:flash.getMessage(req)
       })

   }

   try {
    let userem = await User.findOne({email})
    if(!userem){
        req.flash('fail','Give Correct Credential')
        return res.render('backend/auth/login',{
            error:{},
            flashMessage:flash.getMessage(req)
           
        })
    }
    let userPass = await User.findOne({password})
    if(!userPass){
        req.flash('fail','Give Correct Credential')
        return res.render('backend/auth/login',{
            error:{},
            flashMessage:flash.getMessage(req)
           
        })
    }


    req.session.user = userem;
    req.session.isLoggedIn = true

    req.session.save(err=>{
        if(err){
          return next(err)
        }
        req.flash('success','Successfully Logged In')
        return res.render('backend/dashboard/dashboard',{
            flashMessage:flash.getMessage(req)
        })
    })
   

   } catch (e) {
       console.log(e)
       next(e)
   }

   
}

exports.logOut = (req,res,next)=>{
    
    req.session.destroy(err=>{
        if(err){
           return next(err)
        }
        return res.redirect('/auth/login')
    })
}