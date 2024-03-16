// utilizacion de .env local
import "dotenv/config";
import app from "./app.js";

// puerto de escucha del servidor
const port = process.env.PORT || 4040;

// inicializar la escucha del servidor
app.listen(port, () => {
  // respuesta si el servidor esta escuchando
  console.log("server is listening on port:", port);
});
