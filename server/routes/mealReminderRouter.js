const newLocal = require("express");
const express = newLocal;
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { scheduleMealReminders } = require("../controllers/mealReminderCtrl");

// Route to schedule meal reminders
router.post("/scheduleMealReminders", authMiddleware, scheduleMealReminders);

module.exports = router;
