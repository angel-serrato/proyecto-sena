import "dotenv/config";
import mongoose from "mongoose";

mongoose
  //Conectarse a mongo compass
  // .connect(process.env.URI)
  //Conectarse a mongo atlas
  .connect(process.env.MONGO_URL)

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

const ProductsSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  cantDayAnt: {
    type: Number,
    require: true,
  },
  cantDayEnt: {
    type: Number,
    require: true,
  },
  cantDayFinal: {
    type: Number,
    require: true,
  },
});
const collection = new mongoose.model("LogIncollection", LogInSchema);
//const products = new mongoose.model("Inventarios", ProductsSchema);

// export { collection, products };
export default collection;
