 const auth = require('./authRoutes')
 const dashboard = require('./dashboardRoutes')
 const catagory = require('./catagoryRoutes')
 const subCatagory = require('./subCatagoryRoutes')
 const product = require('./ProductRoutes')
 const Home = require('./HomePageRoutes')
 const FrontendRoute = require('./frontendRoutes')

 const route = [{
         path: '/auth',
         handler: auth
     },
     {
         path: '/dashboard',
         handler: dashboard
     },
     {
         path: '/catagory',
         handler: catagory
     },
     {
         path: '/subCatagory',
         handler: subCatagory
     },
     {
         path: '/product',
         handler: product
     },
    //  FrontendRoute
     {
         path: '/products',
         handler: FrontendRoute
     },
     {
         path: '/',
         handler: Home
     }
 ]


 module.exports = app => {
     route.forEach(r => {
         if (r.path == '/') {
             app.get(r.path, r.handler)
         } else {
             app.use(r.path, r.handler)
         }

     })
 }