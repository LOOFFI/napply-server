const express = require("express");
const Booking = require("../models/booking-model.js");
const User = require("../models/user-model.js");
const router = express.Router();

router.post("/location", (req, res, next) => {
  const { truck_id, user_id } = req.body;

  Booking.create({ truck_id, user_id })
    .then(bookingDoc => res.json(bookingDoc))
    .catch(err => next(err));
});

router.put("/options/:id", (req, res, next) => {
  const { id } = req.params;
  const { sound, plaid, energyShot } = req.body;
  
  Booking.findByIdAndUpdate(
    id,
    { $set: { sound, plaid, energyShot } },
    { runValidators: true, new: true }
  )
  .then(bookingDoc => res.json(bookingDoc))
  .catch(err => next(err));
});


router.post("/booking-date", (req, res, next) => {
      console.log( req.body );
      
      const { selectedDay } = req.body;
      const year = selectedDay.slice(0,4);
      console.log(year);
      const month = (selectedDay.slice(5,7)-1);
      console.log(month);
      const day = selectedDay.slice(8,10);
      console.log(day);
  Booking.find({
    date: {
      $gt: new Date(year, month, day, 0, 0),
      $lt: new Date(year, month, day, 23, 59)
    }
  })
    .then(bookingResults => res.json(bookingResults))
    .catch(err => next(err));
});



router.post("/booking-date/:id", (req, res, next) => {
  const {id} = req.params;
  const { selectedDay, slot } = req.body;
  const date = selectedDay.slice(0,10)+" "+slot+":00";
  console.log(req.body)
  Booking.findByIdAndUpdate(
    id,
  {$set: {date}},
  {runValidators: true}
  )
    .then(bookingDoc => res.json(bookingDoc))
    .catch(err => next(err));
});



// router.delete("/booking-date/:id", (req, res, next) => {
//   const { id } = req.params;
//   Booking.findByIdAndRemove(id)
//     .then(bookingDoc => res.json(bookingDoc))
//     .catch(err => next(err));
// });

module.exports = router;
