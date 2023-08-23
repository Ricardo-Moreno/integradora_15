import products from "./models/products.schema.js";

class productsManager {
    ;
    products;
    constructor() {
        this.products = products;
    }

    async getAllPlayers() {
        try {
            const players = await this.products.find({});

            return players;
        } catch (error) {
            console.log(
                "🚀 ~ file: players.manager.js:18 ~ PlayerManager ~ getAllPlayers ~ error:",
                error
            );
        }
    }

    async getPlayerById(id) {
        try {
            const playerData = await this.products.findOne({ _id: id });
            // TODO: VALIADR SI EL JUGADOR BUSCADO EXISTE O NO

            return playerData;
        } catch (error) {
            console.log(
                "🚀 ~ file: players.manager.js:30 ~ PlayerManager ~ getPlayerById ~ error:",
                error
            );
        }
    }

    async createPlayer(bodyPlayer) {
        try {

            const newPlayer = await this.products.create(bodyPlayer);

            return newPlayer;
        } catch (error) {
            console.log(
                "🚀 ~ file: players.manager.js:40 ~ PlayerManager ~ createPlayer ~ error:",
                error
            );
        }
    }

    async updatePlayer(id, updateBodyPlayer) {
        try {
            const updatedPlayer = await this.products.updateOne({ _id: id }, updateBodyPlayer)
            // TODO: PROBAR MANDANDO 1 SOLO CAMPO DEL JUGADOR, VER Q PASA Y CORREGUIRLO

            return updatedPlayer
        } catch (error) {
            console.log(
                "🚀 ~ file: players.manager.js:47 ~ PlayerManager ~ updatePlayer ~ error:",
                error
            );
        }
    }

    async deletePlayerById(id) {
        try {
            const playerDeleted = this.products.deleteOne({ _id: id });

            return playerDeleted;
        } catch (error) {
            console.log(
                "🚀 ~ file: players.manager.js:57 ~ PlayerManager ~ deletePlayerById ~ error:",
                error
            );
        }
    }
}

export default productsManager;