// User Profile Router
const express = require("express");
const router = express.Router();
const admin = require("../firebase/admin");

const db = admin.firestore();

// Middleware to verify Firebase Auth token
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).send("Token is required");

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }
};

// 1. Get User Profile
router.get("/profile", verifyToken, async (req, res) => {
  const userId = req.user.uid;

  try {
    const userDoc = db.collection("users").doc(userId);
    const userSnapshot = await userDoc.get();

    if (!userSnapshot.exists) {
      return res.status(404).send("User profile not found");
    }

    const userData = userSnapshot.data();
    res.json({ profile: userData });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).send("Internal Server Error");
  }
});

// 2. Update User Profile
router.put("/profile", verifyToken, async (req, res) => {
  const userId = req.user.uid;
  const { nickname, avatar } = req.body;

  if (!nickname && !avatar) {
    return res.status(400).send("No update data provided");
  }

  try {
    const userDoc = db.collection("users").doc(userId);

    const updateData = {};
    if (nickname) updateData.nickname = nickname;
    if (avatar) updateData.avatar = avatar;

    await userDoc.set(updateData, { merge: true });
    res.send("Profile updated successfully");
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).send("Internal Server Error");
  }
});

// 3. Create User Profile (Triggered on Registration)
router.post("/profile", verifyToken, async (req, res) => {
  const userId = req.user.uid;
  const { nickname, avatar } = req.body;

  if (!nickname) {
    return res.status(400).send("Nickname is required");
  }

  try {
    const userDoc = db.collection("users").doc(userId);

    // Check if profile already exists
    const userSnapshot = await userDoc.get();
    if (userSnapshot.exists) {
      return res.status(400).send("User profile already exists");
    }

    await userDoc.set({
      nickname,
      avatar: avatar || "default-avatar.png",
      currency: 100, // Starting currency for new users
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.send("User profile created successfully");
  } catch (error) {
    console.error("Error creating user profile:", error);
    res.status(500).send("Internal Server Error");
  }
});

// 4. Delete User Profile
router.delete("/profile", verifyToken, async (req, res) => {
  const userId = req.user.uid;

  try {
    const userDoc = db.collection("users").doc(userId);
    await userDoc.delete();
    res.send("User profile deleted successfully");
  } catch (error) {
    console.error("Error deleting user profile:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
