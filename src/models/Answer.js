import { model, Schema } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

const answerSchema = new Schema(
  {
    user: { type: ObjectId, ref: "User" }, // referencia al usuario que responde
    description: { type: String, required: true }, // respuesta del usuario
    files: [{ type: ObjectId, ref: "File" }], // archivos anexados a la respuesta
    question: { type: ObjectId, ref: "Question" }, // referencia a la pregunta que hicieron
  },
  { timestamps: true } // fecha de la respuesta y fecha si se llega a modificar
);

export default model("Answer", answerSchema);
