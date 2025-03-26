require("dotenv").config();
const connectDb = require("./config/db");
const app = require("./middleware/app");

connectDb();

app.listen(process.env.PORT || 4000, () => {
  console.log(`server listening on ${process.env.PORT || 4000}`);
});
