import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

console.log("mongodb+srv://mnmbt96:Vathaai1996@cluster0.anbd0pk.mongodb.net/");

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB is connected"))
  .catch((error) => console.error("DB connection error:", error));

export default mongoose;
