const mongoose = require("mongoose");

const reservationSchema = mongoose.Schema({

    idClient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    idCarer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: String,

})

const reservation = mongoose.model("Reservation", reservationSchema);
module.exports = reservation;