import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import indexRoutes from "./routes/index.js";
import collection from "./mongodb.js";

const app = express();

//Configuracion de la ruta absoluta del proyecto
console.log("test");
console.log("meta", import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log("meta", import.meta.url);
console.log("ruta", __dirname);

//Configuracion de express para servir archivoos esttaricos desde la carpeta "public"
app.use(express.static(join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const data = {
    name: req.body.name,
    password: req.body.password,
  };

  await collection.insertMany([data]);
  res.render("productos");
});

app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(indexRoutes);

app.listen(3000);
console.log("El servidor esta escuhando el puerto", 3000);
