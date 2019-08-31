const mongoose = require('mongoose')
const Schema = mongoose.Schema



const contactSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        // lowercase: true
    },
    lastName: {
        type: String,
        default: ""

    },
    email: {
        type: String,
        default: ""
    },
    info: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },

})


module.exports = mongoose.model("Contact", contactSchema)
// 1.model name 
// 2. blue print/model's schema - what we are exporting the model(contactSchema)