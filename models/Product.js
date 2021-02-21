const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    des:{
        type: String,
        required:true
    },
    price:{
        type: Number,
        required: false
    },
    type:{
        type: String,
        required:false
    },
    img: String,
})

module.exports = model('Product', schema)
