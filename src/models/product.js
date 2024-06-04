import mongoose from "mongoose";

//Esquema de la base de datos para (Productos)
const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cantDayAnt: {
    type: Number,
    required: true,
  },
  cantDayEnt: {
    type: Number,
    required: true,
  },
  cantDayFinal: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: false,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Product = new mongoose.model("Inventarios", productsSchema);
export default Product;
