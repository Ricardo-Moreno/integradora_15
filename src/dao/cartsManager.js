import carts from "./models/carts.schema.js";

class CartsManager {
    ;
    carts;
    constructor() {
        this.carts = carts;
    }

    async getAllCarts() {
        try {
            const carts = await this.carts.find({});

            return carts;
        } catch (error) {
            console.log(
                "🚀 ~ file: carts.manager.js:18 ~ CartsManager ~ getAllCarts ~ error:",
                error
            );
        }
    }

    async getCartById(id) {
        try {
            const cartsData = await this.carts.findOne({ _id: id });
            // TODO: VALIADR SI EL JUGADOR BUSCADO EXISTE O NO

            return cartsData;
        } catch (error) {
            console.log(
                "🚀 ~ file: carts.manager.js:30 ~ cartsManager ~ getcartsById ~ error:",
                error
            );
        }
    }

    async createCart() {
        try {
            const newCart = [];
            const newCarts = await this.carts.create(newCart);

            return newCarts;
        } catch (error) {
            console.log(
                "🚀 ~ file: carts.manager.js:40 ~ CartsManager ~ createCart ~ error:",
                error
            );
        }
    }


    async addProduct(cartId, productId) {
        try {
            const cart = await this.carts.findOne({ id: cartId });

            const existingProductIndex = cart.products.findIndex(product => product.product === productId);

            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity += 1;
            } else {
                cart.products.push({
                    product: productId,
                    quantity: 1
                });
            }

            const updatedCart = await cart.save();
            return updatedCart;
        } catch (error) {
            console.log(
                "🚀 ~ file: carts.manager.js:xx ~ CartsManager ~ addProduct ~ error:",
                error
            );
        }
    }




    async deleteCartById(id) {
        try {
            const cartDeleted = this.carts.deleteOne({ _id: id });

            return cartDeleted;
        } catch (error) {
            console.log(
                "🚀 ~ file: players.manager.js:57 ~ PlayerManager ~ deletePlayerById ~ error:",
                error
            );
        }
    }
}

export default CartsManager;










