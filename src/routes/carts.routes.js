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
    try {
        const newCart = await cartsManager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el carrito" });
    }
});

router.post("/:cid/products/:pid", async (req, res) => {
    const id = req.params.cid;
    const productId = req.params.pid;


    const productUpdated = await cartsManager.addProduct(id, productId);
    res.json({ message: "get all method", productUpdated });
});

router.put('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const result = await cartsManager.updateProductQuantity(cid, pid, quantity);
        res.json(result);
    } catch (error) {
        console.error('Error in route:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
});


router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const pDeleted = await cartsManager.deleteCartById(id);

    res.json({ message: "get all method", playerDeleted: pDeleted });
});

router.delete("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const pDeleted = await cartsManager.deleteProductCartById(cid, pid);

    res.json({ message: "get all method", playerDeleted: pDeleted });
});

router.delete('/:cid/products', async (req, res) => {
    const { cid } = req.params;

    try {
        const result = await cartsManager.deleteAllProducts(cid);
        res.json(result);
    } catch (error) {
        console.error('Error in route:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

export default router;











