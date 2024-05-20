import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import indexRoutes from "./routes/index.js";
import { collection, products } from "./mongodb.js";
import bodyParser from "body-parser";

const app = express();

//Configuracion de la ruta absoluta del proyecto
const __dirname = dirname(fileURLToPath(import.meta.url));

//Configuracion de express para servir archivoos esttaricos desde la carpeta "public"
app.use(express.static(join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));
app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const data = {
    name: req.body.name,
    password: req.body.password,
  };

  await collection.insertMany([data]);
  res.render("productos");
});

app.post("/datos-user", async (req, res) => {
  const data = {
    name: req.body.name,
    password: req.body.password,
  };

  const datos = await collection.findOne(data);

  res.json(datos);
});

//verificar el id de usuario
app.post("/verificar-id", async (req, res) => {
  const userId = req.headers.userid;
  console.log("main2", req.headers.userid);
  try {
    const user = await collection.findOne({ _id: userId });
    console.log("main", user);
    if (user) {
      //El usuario existe en la base de datos
      res.status(200).json({ accessAllowed: true });
    } else {
      //El usuario no existe en la base de datos
      res.status(403).json({ accessAccessAllowed: false });
    }
  } catch (error) {
    console.error("Error al verifiicar el ID del usuario", error);
    res.status(403).json({ accessAccessAllowed: false });
  }
});

app.use(indexRoutes);

app.listen(3000);
console.log("El servidor esta escuhando el puerto", 3000);
