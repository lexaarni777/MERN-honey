const {Schema, model} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    cart: {
        items: [
            {
                count:{
                    type: Number,
                    required: true,
                    default: 1
                },
                productId:{
                    type: String,//тип у данного обекта будет обджект айди  тоесть стринг
                    ref: 'Product',
                    required: true
                }
            }
        ]
    }

})

module.exports = model('User', schema)