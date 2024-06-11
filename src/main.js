import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import indexRoutes from "./routes/routes.js";
import collection from "./models/users.js";
import Product from "./models/product.js";
import bodyParser from "body-parser";
import session from "express-session";
import "dotenv/config";
import mongoose from "mongoose";
import multer from "multer";

const app = express();

//Configuracion de la ruta absoluta del proyecto
const __dirname = dirname(fileURLToPath(import.meta.url));

//Configuracion de express para servir archivos estaticos desde la carpeta "public"
app.use(express.static(join(__dirname, "public")));
app.use(express.static(join(__dirname, "uploads")));

//Establecer motor de plantilla
app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

//middlwares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "my secret key",
    saveUninitialized: true,
    resave: false,
  })
);
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});
//Usar las rutas
app.use(indexRoutes);

// Registrar usuario en la base de datos
app.post("/signup", async (req, res) => {
  console.log(req.body);
  const data = {
    email: req.body.email,
    password: req.body.password,
  };

  await collection.insertMany([data]);
  res.redirect("/");
});

app.post("/datos-user", async (req, res) => {
  const data = {
    email: req.body.email,
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

// cargar imagen de inventario
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Se define donde se guardan los archivos cargados
    cb(null, join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

// Procesar la carga de un solo archivo
var upload = multer({
  storage: storage,
}).single("image");

// Añadir producto a la base de datos
app.post("/add", upload, async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      cantDayAnt: req.body.cantAnt,
      cantDayEnt: req.body.cantEnt,
      cantDayFinal: req.body.cantFinal,
      img: req.file.filename,
    });
    await product.save();

    req.session.message = {
      type: "success",
      message: "Producto agregado exitosamente!",
    };
    res.redirect("/productos");
  } catch (err) {
    res.json({ message: err.message, type: "danger" });
  }
});

//Editar producto
app.post("/update/:id", upload, async (req, res) => {
  try {
    const id = req.params.id;
    var new_img = "";

    if (req.file) {
      new_img = req.file.filename;
      try {
        await fs.unlinkSync("./uploads" + req.body.old_img);
      } catch (err) {
        console.log(err);
      }
    } else {
      new_img = req.body.old_img;
    }

    await Product.findByIdAndUpdate(id, {
      name: req.body.name,
      cantDayAnt: req.body.cantAnt,
      cantDayEnt: req.body.cantEnt,
      cantDayFinal: req.body.cantFinal,
      img: new_img,
    });

    req.session.message = {
      type: "success",
      message: "Producto actualizado exitosamente!",
    };
    res.redirect("/productos");
  } catch (err) {
    console.error(err);
    res.json({ message: err.message, type: "danger" });
  }
});

//Conectarse a la base de datos de mongodb atlas
mongoose
  .connect(process.env.MONGO_URL)

  .then(() => {
    console.log("Conectado a mongodb");
  })
  .catch((error) => {
    console.log("Error al conectar mongodb", error);
  });

app.listen(3000);
console.log("El servidor esta escuhando el puerto", 3000);
