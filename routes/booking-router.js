const express = require("express");
const Booking = require("../models/booking-model.js")
const User = require("../models/user-model.js")
const router = express.Router();


router.get("/booking-date", (req,res,next) => {
  
  Booking.find({ date: { $gt: new Date(year,month,day,0,0), $lt: new Date(year,month,day,23,59) } })
    .then(bookingResults => res.json(bookingResults))
    .catch(err => next(err))
})

router.post("/booking-date", (res,req,next) => {
  const {booked,user_id,date} = req.body;
  Booking.create({booked,user_id,date})
    .then(bookingDoc => res.json(bookingDoc))
    .catch(err => next(err));
})


router.delete("/booking-date/:id", (res,req,next) => {
  const {id} = req.params;
  Booking.findByIdAndRemove(id)
    .then(bookingDoc => res.json(bookingDoc))
    .catch(err => next(err));
})




module.exports = router;