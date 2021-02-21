const {Router} = require('express')
const {check} = require('express-validator')
const router = Router()
const Product = require('../models/Product')

// /api/admin/product/crateProduct

router.post('/crateProduct',
    [check('name', 'Введите корректное имя').isString()],
    async (req) => {
        try{
            const {name} = req.body

            const product = new Product ({
                name
            })
            
            await product.save()

        }catch (e){
            console.log(e)
        }
    }
)

module.exports = router