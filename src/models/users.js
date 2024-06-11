import mongoose from "mongoose";

//Esquema de la base de datos para (Usuario)
const LogInSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const collection = new mongoose.model("LogIncollection", LogInSchema);

export default collection;
