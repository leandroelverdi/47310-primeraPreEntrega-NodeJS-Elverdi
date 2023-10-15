import mongoose from "mongoose";

const URI =
  "mongodb+srv://leandroelverdi:nowaying@ecommerse.nff3hdf.mongodb.net/ecomerse?retryWrites=true&w=majority";

mongoose
  .connect(URI)
  .then(() => console.log("db conected"))
  .catch(() => console.log("error to the try connect"));
