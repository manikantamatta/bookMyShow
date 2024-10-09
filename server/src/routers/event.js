const express = require("express");
const router = new express.Router();
const event_controller = require("../controllers/event");

router.get("",event_controller.getFilteredEvents);
router.get("/:id",event_controller.getEventById);
router.get("/ticket/:id",event_controller.getEventTicketInfo);

router.post("",event_controller.addEvent);

module.exports = router;