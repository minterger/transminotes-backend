import mongoose from "mongoose";

(async () => {
  try {
    // conexion a la base de datos
    await mongoose.connect(process.env.DATABASE);

    // respuesta si se conecta
    console.log("database is connected");
  } catch (error) {
    // respuesta del error
    console.error(error);
  }
})();
