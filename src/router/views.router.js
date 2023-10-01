import { Router } from "express";
import { productManager } from "../ProductManager.js";

const router = Router();

router.get("/", async (req, res) => {
  // const { limit } = req.query;
  try {
    const products = await productManager.getProducts();
    // if (!products.length) {
    //   res.status(200);
    // }
    // if (!limit) {
      res.render("home", { products });
    // } else if (limit > 0) {
    //   const productsWithLimit = products.slice(0, limit);
    //   res
    //     .status(200)
    //     .json({ message: "Products found with limit", productsWithLimit });
    // }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await productManager.getProducts();
  try {
    res.render("realTimeProducts", { products });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productManager.getProductById(+pid);
    if (!product) {
      res.status(400).json({ message: "Product not found with the id sent" });
    } else {
      res.status(200).json({ message: "Product found", product });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post("/products", async (req, res) => {
  const { title, description, price, thumbnail, code, stock } = req.body;
  try {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      res.status(403).json({
        message:
          "The object must be contain the following parameters: title, description, price, thumbnail, code, stock.",
      });
    } else {
      const newProduct = await productManager.addProduct(req.body);

      if (newProduct === -1) {
        res.status(403).json({
          message: "the field 'code' already exist in another product",
        });
      } else {
        res
          .status(200)
          .json({ message: `The product '${title}' was added successfully` });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.delete("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const response = await productManager.deleteProduct(+pid);
    if (response === -1) {
      res.status(400).json({ message: "Product not found with the id sent" });
    } else {
      res.status(200).json({ message: "Product deleted" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.put("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    await productManager.updateProduct(pid, req.body);
    res.status(200).json({ message: "product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
