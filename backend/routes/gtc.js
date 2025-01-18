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

// API Routes

// 1. Get Booster Packs
router.get("/packs", verifyToken, async (req, res) => {
  const packs = [
    { id: "starter-pack", name: "Starter Pack", cost: 10 },
    { id: "elite-pack", name: "Elite Pack", cost: 50 },
  ];
  res.json(packs);
});

// 2. Open a Booster Pack
router.post("/packs/open", verifyToken, async (req, res) => {
  const { packId } = req.body;
  const userId = req.user.uid;

  // Fetch the pack cost and card pool
  const packCosts = { "starter-pack": 10, "elite-pack": 50 };
  const cost = packCosts[packId];
  if (!cost) return res.status(400).send("Invalid pack ID");

  // Get user's currency
  const userDoc = db.collection("users").doc(userId);
  const userSnapshot = await userDoc.get();
  const userData = userSnapshot.data();

  if (!userData || userData.currency < cost) {
    return res.status(400).send("Not enough currency");
  }

  // Deduct currency
  await userDoc.update({
    currency: admin.firestore.FieldValue.increment(-cost),
  });

  // Draw cards
  const cards = [
    { name: "Pikachu", rarity: "common", probability: 70 },
    { name: "Charizard", rarity: "rare", probability: 20 },
    { name: "Mewtwo", rarity: "ultra-rare", probability: 10 },
  ];
  const drawnCards = [];
  for (let i = 0; i < 5; i++) {
    drawnCards.push(getRandomCard(cards));
  }

  // Update user's inventory
  const inventoryRef = userDoc.collection("inventory");
  for (const card of drawnCards) {
    const cardRef = inventoryRef.doc(card.name);
    const cardSnapshot = await cardRef.get();

    if (cardSnapshot.exists) {
      await cardRef.update({
        quantity: admin.firestore.FieldValue.increment(1),
      });
    } else {
      await cardRef.set({ name: card.name, rarity: card.rarity, quantity: 1 });
    }
  }

  res.json({ cards: drawnCards });
});

// Helper Function: Randomization
function getRandomCard(cards) {
  const totalWeight = cards.reduce((sum, card) => sum + card.probability, 0);
  const randomNum = Math.random() * totalWeight;

  let cumulativeWeight = 0;
  for (const card of cards) {
    cumulativeWeight += card.probability;
    if (randomNum < cumulativeWeight) {
      return card;
    }
  }
}

module.exports = router;
