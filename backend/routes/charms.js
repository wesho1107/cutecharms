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

// 1. Get Pokémon List
router.get("/pokemon", verifyToken, async (req, res) => {
  const userId = req.user.uid;

  try {
    const allPokemon = [
      { name: "Pikachu", collection: "animals", rarity: "common" },
      { name: "Charizard", collection: "animals", rarity: "rare" },
      { name: "Mewtwo", collection: "emotions", rarity: "ultra-rare" },
    ];

    const inventoryRef = db
      .collection("users")
      .doc(userId)
      .collection("inventory");
    const inventorySnapshot = await inventoryRef.get();

    const ownedPokemon = inventorySnapshot.docs.map((doc) => doc.id);
    const pokemonList = allPokemon.map((pokemon) => ({
      ...pokemon,
      status: ownedPokemon.includes(pokemon.name) ? "unlocked" : "locked",
    }));

    res.json({ pokemon: pokemonList });
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
    res.status(500).send("Internal Server Error");
  }
});

// 2. Add Pokémon to User Inventory
router.post("/pokemon/add", verifyToken, async (req, res) => {
  const userId = req.user.uid;
  const { name, rarity } = req.body;

  try {
    const inventoryRef = db
      .collection("users")
      .doc(userId)
      .collection("inventory");
    const cardRef = inventoryRef.doc(name);
    const cardSnapshot = await cardRef.get();

    if (cardSnapshot.exists) {
      await cardRef.update({
        quantity: admin.firestore.FieldValue.increment(1),
      });
    } else {
      await cardRef.set({
        name,
        rarity,
        quantity: 1,
      });
    }

    res.send("Pokémon added to inventory");
  } catch (error) {
    console.error("Error adding Pokémon to inventory:", error);
    res.status(500).send("Internal Server Error");
  }
});

// 3. Daily Currency Increment
router.post("/currency/daily", verifyToken, async (req, res) => {
  const userId = req.user.uid;

  try {
    const userRef = db.collection("users").doc(userId);
    const userSnapshot = await userRef.get();

    const lastDailyReward = userSnapshot.data()?.lastDailyReward?.toDate();
    const now = new Date();

    if (
      lastDailyReward &&
      lastDailyReward.toDateString() === now.toDateString()
    ) {
      return res.status(400).send("Daily reward already claimed");
    }

    await userRef.update({
      currency: admin.firestore.FieldValue.increment(1),
      lastDailyReward: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.send("Daily currency added");
  } catch (error) {
    console.error("Error adding daily currency:", error);
    res.status(500).send("Internal Server Error");
  }
});

// 4. Open a Pack
router.post("/packs/open", verifyToken, async (req, res) => {
  const { packId } = req.body;
  const userId = req.user.uid;

  const collections = {
    animals: [
      { name: "Pikachu", rarity: "common", probability: 70 },
      { name: "Charizard", rarity: "rare", probability: 20 },
    ],
    emotions: [{ name: "Mewtwo", rarity: "ultra-rare", probability: 100 }],
  };

  if (!collections[packId]) {
    return res.status(400).send("Invalid pack ID");
  }

  try {
    const userRef = db.collection("users").doc(userId);
    const userSnapshot = await userRef.get();
    const userData = userSnapshot.data();

    if (!userData || userData.currency < 1) {
      return res.status(400).send("Not enough currency");
    }

    // Deduct currency
    await userRef.update({
      currency: admin.firestore.FieldValue.increment(-1),
    });

    // Draw Pokémon
    const drawnCard = getRandomCard(collections[packId]);

    // Add to inventory
    const inventoryRef = userRef.collection("inventory");
    const cardRef = inventoryRef.doc(drawnCard.name);
    const cardSnapshot = await cardRef.get();

    if (cardSnapshot.exists) {
      await cardRef.update({
        quantity: admin.firestore.FieldValue.increment(1),
      });
    } else {
      await cardRef.set({
        name: drawnCard.name,
        rarity: drawnCard.rarity,
        quantity: 1,
      });
    }

    res.json({ card: drawnCard });
  } catch (error) {
    console.error("Error opening pack:", error);
    res.status(500).send("Internal Server Error");
  }
});

// 5. Get User Inventory
router.get("/inventory", verifyToken, async (req, res) => {
  const userId = req.user.uid;

  try {
    const inventoryRef = db
      .collection("users")
      .doc(userId)
      .collection("inventory");
    const inventorySnapshot = await inventoryRef.get();

    const inventory = inventorySnapshot.docs.map((doc) => ({
      name: doc.id,
      ...doc.data(),
    }));

    res.json({ inventory });
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
