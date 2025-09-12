const express = require("express");
const { authenticateToken } = require("../middleware/authMiddleware");
const { generateAttendanceQR, verifyQR, saveQRCode } = require("../middleware/qrMiddleware");

const router = express.Router();

// Debugging logs
console.log("generateAttendanceQR type:", typeof generateAttendanceQR);
console.log("verifyQR type:", typeof verifyQR);
console.log("saveQRCode type:", typeof saveQRCode);
console.log("authenticateToken type:", typeof authenticateToken);

// Define routes properly
router.post("/generate", authenticateToken, async (req, res) => {
    try {
        const qrData = await generateAttendanceQR(req);
        await saveQRCode(qrData);
        res.json({ success: true, message: "QR generated and saved successfully", qrData });
    } catch (error) {
        console.error("Error generating QR:", error);
        res.status(500).json({ success: false, message: "Failed to generate QR" });
    }
});

router.post("/verify", authenticateToken, async (req, res) => {
    try {
        const verificationResult = await verifyQR(req);
        res.json({ success: true, message: "QR verified", verificationResult });
    } catch (error) {
        console.error("Error verifying QR:", error);
        res.status(500).json({ success: false, message: "Failed to verify QR" });
    }
});

module.exports = router;
