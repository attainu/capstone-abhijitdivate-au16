const mongoose = require('mongoose');
const{ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pic:{
        type:String,
        default:"https://res.cloudinary.com/dfvaav8sj/image/upload/v1630390403/blank-profile-pic_z2lr9d.png"
    },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]

})    

module.exports = mongoose.model("User", userSchema); 
