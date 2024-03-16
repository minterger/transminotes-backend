import { model, Schema } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

const fileSchema = new Schema({
  user: { type: ObjectId, ref: "User" }, // referencia a usuario que lo subio
  fileName: { type: String, required: true }, // nombre original del archivo
  path: { type: String, required: true }, // ruta del archivo una vez en el servidor
});

export default model("File", fileSchema);
