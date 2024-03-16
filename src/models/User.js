import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const saltRounds = 10; // cantidad de rondas

const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  username: { type: String, required: true }, // usuario de instagram
  password: { type: String }, // contraseña encriptada
  Questions: [{ type: ObjectId, ref: "Question" }], // array with questions id
  answers: [{ type: ObjectId, ref: "Answer" }], // array with answers id
  files: [{ type: ObjectId, ref: "File" }], // array with files id
});

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(saltRounds); // gen Salt
    this.password = await bcrypt.hash(this.password, salt); // encrypt password
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default model("User", userSchema);
