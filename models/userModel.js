const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true,unique: true},
    password: {type: String,required: true},
    date: {type: Date,default: Date.now()}
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        //do not reveal passwordHash
        delete returnedObject.password
    }
})

const User =  mongoose.model("user", userSchema);

module.exports = User;