const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const { checkIn } = require("../controllers/attendanceController");

const router = express.Router();
router.post("/check-in", verifyToken, checkIn);  
module.exports = router;
