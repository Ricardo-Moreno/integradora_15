import { Router } from "express";
import ProductsManager from "../dao/productsManager.js";


const router = Router();

const productsManager = new ProductsManager();

router.get("/", async (req, res) => {
    const products = await productsManager.getAllProducts();

    res.json({ message: "get all method", products });
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const product = await productsManager.getProductById(id)
    res.json({ message: "get all method", product });
});

router.post("/", async (req, res) => {
    const bodyProduct = req.body;
    console.log(
        "🚀 ~ file: players.routes.js:28 ~ router.post ~ bodyProducts:",
        bodyProduct
    );
    const newProduct = await productsManager.createproduct(bodyProduct);

    res.json({ message: "get all method", player: newProduct });
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const bodyProduct = req.body;

    const pUpdated = await productsManager.updateProduct(id, bodyProduct);
    res.json({ message: "get all method" });
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const pDeleted = await productsManager.deleteProductById(id);

    res.json({ message: "get all method", productDeleted: pDeleted });
});

export default router;