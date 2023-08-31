import { Router } from "express";
import ProductsManager from "../dao/productsManager.js";


const router = Router();
const productsManager = new ProductsManager();



router.get("/", async (req, res) => {
    const { page, limit, query, price } = req.query;


    ;

    try {
        const products = await productsManager.getAllProducts(page, limit, query, price);

        res.render("products", { products });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const product = await productsManager.getProductById(id)
    res.json({ message: "get all method", product });
});

router.post("/", async (req, res) => {
    const bodyProduct = req.body;
    console.log(
        "🚀 ~ file: products.routes.js:28 ~ router.post ~ bodyProducts:",
        bodyProduct
    );
    const newProduct = await productsManager.createProduct(bodyProduct);

    res.json({ message: "get all method", cart: newProduct });
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const bodyProduct = req.body;

    const pUpdated = await productsManager.updateProduct(id, bodyProduct);
    res.json({ message: "get all method", pUpdated });
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const pDeleted = await productsManager.deleteProductById(id);

    res.json({ message: "get all method", productDeleted: pDeleted });
});

export default router;