const {Router} = require('express')
const {check} = require('express-validator')
const router = Router()
const Product = require('../models/Product')

// /api/admin/product/crateProduct

router.post('/crateProduct',
    [check('name', 'Введите корректное имя').isString()],
    [check('des', 'Введите корректное описание').isString()],
    async (req) => {
        try{
            const {name,des} = req.body

            const product = new Product ({
                name,
                des
            })
            console.log('product:',product)
            await product.save()

        }catch (e){
            console.log(e)
        }
    }
)

module.exports = router