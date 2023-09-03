class ProductManager {
  constructor() {
    this.products = [];
    this.nextProductId = 1;
  }

  addProduct(product) {
    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
      console.error("Todos los campos son obligatorios.");
      return;
    }

    if (this.products.some(existingProduct => existingProduct.code === product.code)) {
      console.error("El campo 'code' ya existe para otro producto.");
      return;
    }

    product.id = this.nextProductId++;
    this.products.push(product);
    console.log(`Producto "${product.title}" agregado con éxito.`);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);

    if (product) {
      return product;
    } else {
      console.error("Producto no encontrado.");
    }
  }
}

const productManager = new ProductManager();

productManager.addProduct({
  title: "Producto 1",
  description: "Descripción del producto 1",
  price: 19.99,
  thumbnail: "imagen1.jpg",
  code: "ABC123",
  stock: 10
});

productManager.addProduct({
  title: "Producto 2",
  description: "Descripción del producto 2",
  price: 29.99,
  thumbnail: "imagen2.jpg",
  code: "XYZ456",
  stock: 5
});

console.log(productManager.getProducts());

const productById = productManager.getProductById(2);
console.log(productById);
