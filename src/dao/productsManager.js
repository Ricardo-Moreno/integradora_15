import products from "./models/products.schema.js";

class productsManager {
    ;
    products;
    constructor() {
        this.products = products;
    }

    async getAllProducts() {
        try {
            const products = await this.products.find({});

            return products;
        } catch (error) {
            console.log(
                "🚀 ~ file: products.manager.js:18 ~ ProductManager ~ getAllProducts ~ error:",
                error
            );
        }
    }

    async getProductById(id) {
        try {
            const productData = await this.products.findOne({ _id: id });
            // TODO: VALIADR SI EL JUGADOR BUSCADO EXISTE O NO

            return productData;
        } catch (error) {
            console.log(
                "🚀 ~ file: products.manager.js:30 ~ ProductManager ~ getProductById ~ error:",
                error
            );
        }
    }

    async createProduct(bodyProduct) {
        try {

            const newProduct = await this.products.create(bodyProduct);

            return newProduct;
        } catch (error) {
            console.log(
                "🚀 ~ file: products.manager.js:40 ~ ProductManager ~ createProduct ~ error:",
                error
            );
        }
    }

    async updateProduct(id, updateBodyProduct) {
        try {
            const updatedProduct = await this.products.updateOne({ _id: id }, updateBodyProduct)
            // TODO: PROBAR MANDANDO 1 SOLO CAMPO DEL JUGADOR, VER Q PASA Y CORREGUIRLO

            return updatedProduct
        } catch (error) {
            console.log(
                "🚀 ~ file: products.manager.js:47 ~ ProductManager ~ updateProduct ~ error:",
                error
            );
        }
    }

    async deleteProductById(id) {
        try {
            const productDeleted = this.products.deleteOne({ _id: id });

            return productDeleted;
        } catch (error) {
            console.log(
                "🚀 ~ file: products.manager.js:57 ~ ProductManager ~ deleteProductById ~ error:",
                error
            );
        }
    }
}

export default productsManager;







