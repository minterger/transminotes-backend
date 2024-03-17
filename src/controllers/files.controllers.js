import File from "../models/File.js";

export const getFile = (req, res) => {};

export const removeFile = (req, res) => {};

export const uploadFile = (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("No files were uploaded.");
    return;
  }

  const newFile = new File({
    fileName: req.files.file?.name,
    type: req.files.file?.mimetype,
    user: req.user.id,
  });

  const saveFile = newFile.save;

  res.send("ok");
};
