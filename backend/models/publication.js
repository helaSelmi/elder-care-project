const mongoose = require("mongoose");
const publicationSchema = mongoose.Schema({
    title: String,
    description: String,
    status: String,
    case: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    carerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

});
const publication = mongoose.model("Publication", publicationSchema);
module.exports = publication;