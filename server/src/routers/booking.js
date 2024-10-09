const express = require("express");
const router = new express.Router();
const auth_middleware = require("../middlewares/auth");
const booking_controller = require("../controllers/booking.js");

router.post("/:id", auth_middleware.authenticateToken,booking_controller.bookShow);
router.post("/", auth_middleware.authenticateToken,booking_controller.bookSeat);
router.post("/event/:id", auth_middleware.authenticateToken,booking_controller.bookEvent);
router.get("/user/:id",booking_controller.getAllBookingsForUser);
router.get("/recent/:id",booking_controller.getRecentBookings);


module.exports = router;