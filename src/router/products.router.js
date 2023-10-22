import { Router } from "express";
import { productManager } from "../Dao/managers/productsManager";
const router = Router();

router.post("/", async (req, res) => {});

router.get("/", async (req, res) => {
  const products = await productManager.findAllProducts(req.body);
  res.json({ products });
});
