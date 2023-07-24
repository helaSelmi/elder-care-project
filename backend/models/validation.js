const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-Validator")
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    telephone: { type: Number, unique: true },
    password: String,

})
userSchema.plugin(uniqueValidator);
//  Model name "User" => PascalCase
const validationUser = mongoose.model("Validation", userSchema);
module.exports = validationUser;