const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const DB = "mongodb+srv://Sreerang:krishna@cluster0-knepk.mongodb.net/image-processor?retryWrites=true&w=majority"

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});