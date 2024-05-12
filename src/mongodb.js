import "dotenv/config";
import mongoose from "mongoose";

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Conectado a mongodb");
  })
  .catch((error) => {
    console.log("Error al conectar mongodb", error);
  });

const LogInSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const collection = new mongoose.model("LogIncollection", LogInSchema);

export default collection;
