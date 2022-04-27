const mongoose = require("mongoose")
const mobileSchema = mongoose.Schema({
    mobile_brand: { 
        type: String,
        minLength: 1,
        maxLength: 40, 
        required: true,
        trim: true
    },
    mobile_color:  { 
        type: String, 
        required: true
    },
    mobile_cost: { 
        type: Number, 
        min:[15, 'Minimum of 15$ but, got {VALUE}'], 
        max:40000
    }
})
module.exports = mongoose.model("Mobile", mobileSchema)