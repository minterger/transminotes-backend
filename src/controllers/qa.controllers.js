import Answer from "../models/Answer.js";
import Question from "../models/Question.js";

export const addQuestion = async (req, res) => {
  const { files, title, description } = req.body;

  try {
    const newQuestion = new Question({
      title,
      description,
      files,
    });

    const question = await newQuestion.save();

    res.json({
      message: "Pregunta Generada",
      question,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });

    console.error(error);
  }
};

export const updateQuestion = async (req, res) => {
  const id = req.params.id;

  const { files, title, description } = req.body;

  try {
    const findQuestion = await Question.findById(id);

    if (findQuestion.user?.id !== req.user?.id) {
      res.satus(401).json({ message: "Acceso no autorizado" });
    }

    if (!findQuestion)
      return res.status(404).json({ message: "Pregunta no encontrada" });

    findQuestion.title = title || findQuestion.title;
    findQuestion.description = description || findQuestion.description;
    findQuestion.files = files || findQuestion.files;

    const question = await findQuestion.save();

    res.json({
      message: "Pregunta actualizada",
      question,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error(error);
  }
};

export const getQuestion = async (req, res) => {
  const idQuestion = req.params.id;

  try {
    const question = await Question.findById(idQuestion).populate();

    if (!question)
      return res.status(404).json({
        message: "No se encontro ninguna pregunta",
      });

    return res.json({
      message: "Pregunta Encotrada",
      question,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error(error);
  }
};

export const getAllQuestions = async (req, res) => {
  const idUsuario = req.params.id;

  try {
    const questions = await Question.find({ user: idUsuario }).populate();

    if (!questions.length)
      return res.status(404).json({
        message: "Ninguna pregunta encontrada",
      });

    res.json({
      message: "Preguntas encontradas",
      questions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Interna Server Error",
    });
    console.error(error);
  }
};

export const addAnswer = async (req, res) => {
  const idQustion = req.params.idQuestion;

  const { description, files } = req.body;

  try {
    const question = await Question.findById(idQustion);

    if (!question)
      return res.status(404).json({ message: "Pregunta no encontada" });

    const newAnswer = new Answer({ description, files, question: idQustion });

    const answer = await newAnswer.save();

    question.answers.push(answer.id);

    res.json({ message: "Respuesta guardada" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
