const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, required: true },
    date: { type: Date, required: true },
    booked: { type: Boolean, default: true },
    truck_id: { type: Number, required: true },
    options: { type: [String] }
  },
  {
    timestamps: true
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
