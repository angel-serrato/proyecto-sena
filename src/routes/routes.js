import { Router } from "express";
import Product from "./../models/product.js";

const router = Router();

router.get("/", (req, res) => res.render("login"));
router.get("/signup", (req, res) => res.render("signup"));
router.get("/index", (req, res) => res.render("index"));
// Definición de la ruta GET para la URL raíz "/"
router.get("/productos", async (req, res) => {
  try {
    // Buscar todos los productos en la base de datos usando el modelo Product
    const products = await Product.find().exec();

    // Renderizar la vista 'productos' con los productos obtenidos
    res.render("productos", {
      title: "Inventario",
      products: products,
    });
  } catch (err) {
    // Si ocurre un error, responder con un mensaje de error en formato JSON
    res.json({ message: err.message });
  }
});

router.get("/add", (req, res) => {
  res.render("add_products", { title: "Añadir Productos" });
});

//Ruta para editar un producto
router.get("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (product == null) {
      res.render("/productos");
    } else {
      res.render("edit_products", {
        title: "Editar Producto",
        product: product,
      });
    }
  } catch (err) {
    console.error(err);
    res.render("/productos");
  }
});
// Ruta para eliminar un producto
router.get("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Product.findByIdAndDelete(id);

    if (result.img != "") {
      try {
        await fs.unlinkSync("./uploads" + result.img);
      } catch (err) {
        console.log(err);
      }
    }

    req.session.message = {
      type: "info",
      message: "Producto eliminado exitosamente!",
    };

    res.redirect("/productos");
  } catch (err) {
    console.error(err);
    res.json({ message: err.message });
  }
});

export default router;
