const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(product) {
    try {
      const products = await this.getProducts();

      if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.thumbnail ||
        !product.code ||
        !product.stock
      ) {
        return "Todos los campos son obligatorios.";
      }

      if (
        products.some(
          (existingProduct) => existingProduct.code === product.code
        )
      ) {
        return "El campo 'code' ya existe para otro producto.";
      }

      let id = 1;
      if (products.length > 0) {
        id = products[products.length - 1].id + 1;
      }

      products.push({ id, ...product });
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return console.log(`Producto "${product.title}" agregado con éxito.`);
    } catch (error) {
      return error;
    }
  }

  async getProducts() {
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
        products[productIndex] = { ...products[productIndex], ...productObj };

        await fs.promises.writeFile(this.path, JSON.stringify(products));
        return console.log("Producto actualizado correctamente");
      }
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(idProduct) {
    try {
      const products = await this.getProducts();

      const existProduct = products.findIndex(
        (product) => product.id === idProduct
      );

      if (existProduct !== -1) {
        const newArrayProduct = products.filter(
          (product) => product.id !== idProduct
        );
        await fs.promises.writeFile(this.path, JSON.stringify(newArrayProduct));
        return console.log("Producto eliminado correctamente");
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

      if (product) {
        return product;
      } else {
        return console.log("Producto no encontrado.");
      }
    } catch (error) {
      return error;
    }
  }
}

const myFunction = async () => {
  const productManager = new ProductManager("data.json");

  console.log(await productManager.getProducts());

  await productManager.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "ABC123",
    stock: 25,
  });

  console.log(await productManager.getProducts());

  await productManager.getProductById(1);

  await productManager.updateProduct(1, { title: "Titulo actualizado" });
  
  await productManager.deleteProduct(1);
};

myFunction();
