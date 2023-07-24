const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    telephone: { type: Number, unique: true },
    adress: String,
    experience: Number,
    email: { type: String, unique: true },
    password: String,
    role: String,
    status: String,
    avatar: String,
    cv: String

})
userSchema.plugin(uniqueValidator);
//  Model name "User" => PascalCase
const user = mongoose.model("User", userSchema);
module.exports = user;