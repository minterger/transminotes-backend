import { model, Schema } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

const questionSchema = new Schema(
  {
    user: { type: ObjectId, ref: "User" }, // referencia al usuario que realizo la pregunta
    title: { type: String, required: true }, // titulo de la pregunta
    description: { type: String, required: true }, // descripcion de la pregunta
    files: [{ type: ObjectId, ref: "File" }], // archivos que se anexaron a la pregunta
    answers: [{ type: ObjectId, ref: "Answer" }], // referencia a las respuestas de las preguntas
  },
  { timestamps: true } // fecha y hora en que se crea la pregunta y fecha si se llega a modificar
);

export default model("Question", questionSchema);
