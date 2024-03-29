import express from "express";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import cors from "cors";
import indexRoute from "./routes/index.routes.js";
import userRoute from "./routes/user.routes.js";
import qaRoutes from "./routes/qa.routes.js";
import filesRoutes from "./routes/files.routes.js";

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
app.use(fileUpload());

// routes
app.get("/", (req, res) => {
  res.send("ok, Transmi Notes");
});

app.use(userRoute); // login, register, get user data
app.use(qaRoutes);
app.use(filesRoutes);
app.use(indexRoute);

export default app;
