import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.CONNECTION_URL);

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB is connected"))
  .catch((error) => console.error("DB connection error:", error));

export default mongoose;
