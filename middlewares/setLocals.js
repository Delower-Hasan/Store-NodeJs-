module.exports = ()=>{
   return  (req,res,next)=>{
    res.locals.user = req.session.isLoggedIn
    res.locals.isLoggedIn = req.user
    next()
   }
}