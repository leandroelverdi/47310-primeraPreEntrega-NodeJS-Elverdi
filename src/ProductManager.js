import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(product) {
    try {
      const products = await this.getProducts();
      const someProduct = products.some(
        (existingProduct) => existingProduct.code === product.code
      );

      if (someProduct) {
        return -1;
      }

      let id = 1;
      if (products.length > 0) {
        id = products[products.length - 1].id + 1;
      }

      products.push({ id, ...product });
      await fs.promises.writeFile(this.path, JSON.stringify(products));
    } catch (error) {
      return error;
    }
  }

  async getProducts(limit) {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(products);
      } else return [];
    } catch (error) {
      return error;
    }
  }

  async updateProduct(idProduct, productObj) {
    try {
      const products = await this.getProducts();

      const productIndex = products.findIndex(
        (product) => product.id === idProduct
      );

      if (productIndex !== -1) {
        const product = products[productIndex];
        products = { ...product, ...productObj };

        await fs.promises.writeFile(this.path, JSON.stringify(products));
      } else {
        return -1;
      }
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(idProduct) {
    try {
      const products = await this.getProducts();
      const product = products.find((product) => product.id === idProduct);
      if (!product) {
        return -1;
      }

      const existProduct = products.findIndex(
        (product) => product.id === idProduct
      );

      if (existProduct !== -1) {
        const newArrayProduct = products.filter(
          (product) => product.id !== idProduct
        );
        await fs.promises.writeFile(this.path, JSON.stringify(newArrayProduct));
        console.log("Producto eliminado correctamente");
        return 1;
      } else {
        return console.log("El producto que desea eliminar no existe");
      }
    } catch (error) {
      return error;
    }
  }

  async getProductById(idProduct) {
    try {
      const products = await this.getProducts();
      const product = products.find((product) => product.id === idProduct);
      return product;
    } catch (error) {
      return error;
    }
  }
}

export const productManager = new ProductManager("productos.json");
