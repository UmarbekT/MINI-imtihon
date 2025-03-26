const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    mongoose
      .connect(
        process.env.DATABASE.replace("<db_password>", process.env.PASSWORD)
      )
      .then(console.log("MongoDb Connected"));
  } catch (error) {
    console.log("connectDb Error", error);
  }
};
module.exports = connectDb;
