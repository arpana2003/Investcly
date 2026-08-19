const express = require("express");
const router = express.Router();

const mailerController = require("../controllers/mailer.js");
const authController = require("../controllers/authController.js");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const {
  authenticateToken,
  authorizeAdmin,
} = require("../middleware/authMiddleware.js");
const User = require("../models/User.js");

//Step1: Redirect to google login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    try {
      const token = jwt.sign(
        {
          id: req.user._id,
          email: req.user.email,
          isAdmin: req.user.isAdmin,
          isSubscribed: req.user.isSubscribed,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
      res.redirect(`${clientUrl}/auth-success?token=${token}`);
      console.log("Redirecting to:", `${clientUrl}/auth-success?token=${token}`);

    } catch (error) {
      console.error("Google Login Error", error);
      res.redirect(`${process.env.CLIENT_URL}/login?error=google_failed`);
    }
  }
);

router.get("/me", authenticateToken, (req, res) => {
  const user = req.user; // Already populated by middleware
  res.json({
    success: true,
    user: {
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      isSubscribed: user.isSubscribed,
      isAllowedToCreate: user.isAllowedToCreate,
    },
  });
});

router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.patch("/toggle-permission/:id", authController.togglePermission);
router.get(
  "/admin/users",
  authenticateToken,
  authorizeAdmin,
  authController.getAllUsers
);
router.post(
  "/admin/allow-creation",
  authenticateToken,
  authorizeAdmin,
  authController.allowCreation
);
router.post(
  "/admin/delete-user",
  authenticateToken,
  authorizeAdmin,
  authController.deleteUser
);
router.post("/admin/send-code", mailerController.sendCode);
router.get("/admin/send-code", (req, res) => {
  console.log("send api is ok");
  res.send("GET /admin/send-code reached and API is OK");
});

router.patch("/subscribe", authenticateToken, async (req, res) => {
  try {
    // Fetch fresh user document from DB using id from token
    const user = await User.findById(req.user.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if already subscribed
    if (user.isSubscribed) {
      return res
        .status(400)
        .json({ success: false, message: "Already subscribed" });
    }

    // Update subscription
    user.isSubscribed = true;
    await user.save();

    res.json({
      success: true,
      message: "Subscription successful",
      user: {
        id: user._id,
        email: user.email,
        isSubscribed: user.isSubscribed,
      },
    });
  } catch (error) {
    console.error("Subscription error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/admin/verify-code", mailerController.verifyCode);
router.post("/admin/reset-password", mailerController.resetPassword);

router.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the authentication API" });
});

module.exports = router;
