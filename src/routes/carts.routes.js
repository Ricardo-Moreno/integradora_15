import { Router } from "express";
import CartsManager from "../dao/cartsManager.js";


const router = Router();

const cartsManager = new CartsManager();

router.get("/", async (req, res) => {
    const players = await cartsManager.getAllPlayers();

    res.json({ message: "get all method", players });
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;

    res.json({ message: "get all method" });
});

router.post("/", async (req, res) => {
    const bodyPlayer = req.body;
    console.log(
        "🚀 ~ file: players.routes.js:28 ~ router.post ~ bodyPlayer:",
        bodyPlayer
    );
    const newPlayer = await cartsManager.createPlayer(bodyPlayer);

    res.json({ message: "get all method", player: newPlayer });
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const bodyPlayer = req.body;

    const pUpdated = await cartsManager.updatePlayer(id, bodyPlayer);
    res.json({ message: "get all method" });
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const pDeleted = await cartsManager.deletePlayerById(id);

    res.json({ message: "get all method", playerDeleted: pDeleted });
});

export default router;