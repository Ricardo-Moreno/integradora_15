import carts from "./models/carts.schema.js";

class CartsManager {
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
            const newCart = {
                products: []
            };

            const createdCart = await this.carts.create(newCart);

            return createdCart;
        } catch (error) {
            console.log(
                "🚀 ~ file: carts.manager.js:xx ~ CartsManager ~ createCart ~ error:",
                error
            );
        }
    }
    // async addProduct(cartId, productId) {
    //     try {
    //         const result = await this.carts.updateOne(
    //             { _id: cartId },
    //             { $push: { products: { product: productId } } }
    //         )
    //         console.log(result)
    //         console.log(this.carts[products])
    //         const existingProduct = this.carts.products.find(product => product.product === productId);
    //         console.log(existingProduct)
    //         if (existingProduct) {
    //             existingProduct.quantity += 1;
    //         } else {
    //             this.carts.products.push({
    //                 product: productId,
    //                 quantity: 1
    //             });
    //         }

    //         const updatedCart = await this.carts.save();
    //         return updatedCart;

    //     } catch (error) {
    //         console.log(
    //             "🚀 ~ file: carts.manager.js:xx ~ CartsManager ~ addProduct ~ error:",
    //             error
    //         );
    //     }
    // }
    async addProduct(cartId, productId) {
        try {
            const existingCart = await this.carts.findOne({ _id: cartId }).populate('products.product');

            if (!existingCart) {
                throw new Error("Cart not found");
            }

            const existingProduct = existingCart.products.find(productObj => productObj.product._id.toString() === productId);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                existingCart.products.push({
                    product: productId,
                    quantity: 1
                });
            }

            const updatedCart = await existingCart.save();
            return updatedCart;
        } catch (error) {
            console.log("🚀 ~ file: carts.manager.js:xx ~ CartsManager ~ addProduct ~ error:", error);
            throw error; // Re-throw the error to handle it at the caller level if needed
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

    async deleteProductCartById(cid, pid) {
        try {
            const cart = await this.carts.findOne({ _id: cid });

            if (!cart) {
                console.log("Cart not found");
                return null;
            }
            cart.products = cart.products.filter(product => product.product !== pid);

            // Guardar los cambios en la base de datos
            await cart.save();

            return cart;
        } catch (error) {
            console.log(
                "🚀 ~ file: players.manager.js:57 ~ PlayerManager ~ deletePlayerById ~ error:",
                error
            );
        }
    }

    async updateProductQuantity(cid, pid, quantity) {
        try {
            const cart = await this.carts.findById(cid);

            if (!cart) {
                throw new Error('Cart not found');
            }

            const productIndex = cart.products.findIndex(product => product.product.toString() === pid);

            if (productIndex === -1) {
                throw new Error('Product not found in cart');
            }

            cart.products[productIndex].quantity = quantity;
            await cart.save();

            return { message: 'Product quantity updated successfully' };
        } catch (error) {
            console.error('Error updating product quantity:', error);
            throw error;
        }
    }
    async deleteAllProducts(cid) {
        try {
            const cart = await this.carts.findById(cid);

            if (!cart) {
                throw new Error('Cart not found');
            }

            cart.products = []; // Vaciamos el array de productos
            await cart.save();

            return { message: 'All products deleted from cart successfully' };
        } catch (error) {
            console.error('Error deleting products from cart:', error);
            throw error;
        }
    }
}


export default CartsManager;










