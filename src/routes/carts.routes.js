import { Router } from "express";
import CartsManager from "../dao/cartsManager.js";


const router = Router();
const cartsManager = new CartsManager();

router.get("/", async (req, res) => {
    const carts = await cartsManager.getAllCarts();

    res.json({ message: "get all method", carts });
});



router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const cartsById = await cartsManager.getCartById(id)
    res.json({ message: "get all method", cartsById });
});

router.post("/", async (req, res) => {
    console.log(
        "🚀 ~ file: Carts.routes.js:28 ~ router.post ~ bodCarts:",
        bodCarts
    );
    const newCart = await cartsManager.createCart();

    res.json({ message: "get all method", player: newCart });
});

router.post("/:cid/products/:pid", async (req, res) => {
    const id = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);

    const productUpdated = await cartsManager.addProduct(id, productId);
    res.json({ message: "get all method", productUpdated });
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const pDeleted = await cartsManager.deletePlayerById(id);

    res.json({ message: "get all method", playerDeleted: pDeleted });
});

export default router;











