import mongoose from "mongoose";

//Esquema de la base de datos para (Usuario)
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
