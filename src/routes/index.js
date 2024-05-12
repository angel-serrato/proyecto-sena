import { Router } from "express";
const router = Router();

router.get("/signup", (req, res) => res.render("signup"));
router.get("/", (req, res) => res.render("login"));
router.get("/index", (req, res) => res.render("index"));
router.get("/precios", (req, res) => res.render("precios"));
router.get("/ubicacion", (req, res) => res.render("ubicacion"));
router.get("/productos", (req, res) => res.render("productos"));

export default router;
