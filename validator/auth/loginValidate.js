const {body} = require('express-validator')


module.exports = [

    body('email')
    .not().isEmpty().withMessage('email Cant be Empty')
    .normalizeEmail(),
    body('password')
    .not().isEmpty().withMessage('Password cant be Empty')

]
