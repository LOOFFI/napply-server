const express = require("express");
const Booking = require("../models/booking-model.js");
const User = require("../models/user-model.js");
const router = express.Router();

router.get("/booking-date/:id", (req, res, next) => {

  const { id } = req.params;

  Booking.findById(id)
  .then(bookingDoc => res.json(bookingDoc))
  .catch(err => {
    next(err);
  });
});

router.get("/booking", (req, res, next) => {

  Booking.find()
    .then(bookingDoc => res.json(bookingDoc))
    .catch(err => next(err));
});


router.get("/booking-date/", (req, res, next) => {

  Booking.find({ user_id: { $eq: req.user._id } })
    .then(bookingDoc => {
      res.json(bookingDoc)})
    .catch(err => {
      next(err);
    });
});


//-----------------------------------------------------------------------------------------
// This /location POST request is here to create the booking when the user validate the 
// process whith all the state parameters from the Booking component 
//-----------------------------------------------------------------------------------------


router.post("/location", (req, res, next) => {

  const { truck_id, user_id, sound, plaid, energyShot, selectedDay, slot } = req.body;
  const date = new Date(selectedDay.slice(0, 10) + " " + slot + ":00");
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset())

  Booking.create({ truck_id, user_id, sound, plaid, energyShot, date })
    .then(bookingDoc => res.json(bookingDoc))
    .catch(err => next(err));
});

//------------------------------------------------------------------------------------------
// the /booking-date POST request is here to feed the bookingArray in the booking component
// in order to see if a time-slot is already booked
//------------------------------------------------------------------------------------------

router.post("/booking-date", (req, res, next) => {

  const { selectedDay } = req.body;
  const year = selectedDay.slice(0, 4);
  const month = selectedDay.slice(5, 7) - 1;
  const day = selectedDay.slice(8, 10);
  
  Booking.find({
    date: {
      $gt: new Date(year, month, day, 0, 0),
      $lt: new Date(year, month, day, 23, 59)
    }
  })
    .then(bookingResults => res.json(bookingResults))
    .catch(err => next(err));
});



router.delete("/booking/:id", (req, res, next) => {

  const { id } = req.params;
  
  Booking.findByIdAndRemove(id)
    .then(bookingDoc => {
      console.log("Booking Deleted!");
      res.json(bookingDoc);
    })
    .catch(err => next(err));
});

module.exports = router;
