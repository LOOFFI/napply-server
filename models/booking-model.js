const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, required: true },
    date: { type: Date },
    booked: { type: Boolean, default: true },
    truck_id: { type: String, required: true },
    sound: { type: String, default: "none" },
    plaid: { type: String, default: "none" },
    energyShot: {
      type: String,
      default: "none",
      enum: ["none", "Super Green", "Veggie Detox", "White Paradise"]
    }
  },
  {
    timestamps: true
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
