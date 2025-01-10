const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// Database Setup
main()
  .then(() => {
    console.log("db connection successful!");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "677f25bde2509f5641aac948",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
