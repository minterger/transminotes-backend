import express from "express";
import fileupload from "express-fileupload";
import morgan from "morgan";
import cors from "cors";
import indexRoute from "./routes/index.routes.js";

// conexion a la base de datos
import "./database.js";

// inicializar express
const app = express();

// config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(fileupload());

// routes
app.get("/", (req, res) => {
  res.send("ok");
});

app.use(indexRoute);

export default app;
