require("dotenv").config();
const admin = require("firebase-admin");
const algoliasearch = require("algoliasearch");

const serviceAccount = require("./serviceAccount.json");
const movies = require("./data/suggestions.json");
console.log("Firestore emulator: " + process.env.FIRESTORE_EMULATOR_HOST);

const firestoreLocalhost =
  process.env.FIRESTORE_EMULATOR_HOST.indexOf("localhost");

if (firestoreLocalhost !== 0) {
  console.log(
    "Sorry! This script is intended for localhost firestore emulator only."
  );
  process.exit(-1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIRESTORE_EMULATOR_HOST,
});

// for clearing Algolia Index we need the Admin key
const algoliaClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN
);

const moviesIndex = algoliaClient.initIndex("movies");

const db = admin.firestore();
const moviesBatch = db.batch();
const moviesRef = db.collection("suggestions");

movies.map((t) => {
  let newDoc = moviesRef.doc();
  moviesBatch.set(newDoc, { name: t });
  return true;
});

const RefreshData = async () => {
  try {
    await moviesIndex.clearObjects().wait();
    console.log("cleared algolia index");

    await moviesBatch.commit();
    console.log("\x1b[32m", "Added movie suggestions!");
    process.exit(-1);
  } catch (e) {
    console.error(e);
  }
};

RefreshData().then();
