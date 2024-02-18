const ctrlWrapper = require('../../helpers/ctrlWrapper');
const fs = require('fs').promises;
const path = require('path');
const db = require('../../models');

const dir = process.env.DIR_DOCUMENTS_FILES || 'public/images/documents';

const updateDocumentController = ctrlWrapper(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Invalid document ID' });
  }

  const existingDocument = await db.Documents.findByPk(id);

  if (!existingDocument) {
    return res.status(404).json({ message: 'Document not found' });
  }

  if (req.file) {
    await handleFileUpload(req, existingDocument);
  }

  const updatedFields = {
    name: req.body.name || existingDocument.name,
  };

  if (req.file) {
    updatedFields.file = getFileName(req.file);
  }

  await updateDocument(existingDocument, updatedFields);

  res
    .status(200)
    .json({ status: 'success', message: 'Document updated successfully' });
});

const handleFileUpload = async (req, existingDocument) => {
  if (existingDocument.file) {
    await deletePreviousDocument(existingDocument);
  }

  const fileName = getFileName(req.file);
  const filePath = path.join(dir, fileName);

  await fs.writeFile(filePath, req.file.buffer);
};

const deletePreviousDocument = async existingDocument => {
  const previousDocumentPath = path.join(dir, existingDocument.file);

  try {
    await fs.access(previousDocumentPath, fs.constants.R_OK);
    await fs.unlink(previousDocumentPath);
  } catch (error) {
    console.error('Error deleting previous document:', error);
  }
};

const getFileName = file => {
  const fileNameWithoutExtension = path.basename(
    file.originalname,
    path.extname(file.originalname)
  );
  const mimetype = file.mimetype.split('/');
  const filetype = mimetype[1];
  return fileNameWithoutExtension + '.' + filetype;
};

const updateDocument = async (existingDocument, updatedFields) => {
  await existingDocument.update(updatedFields);
};

module.exports = updateDocumentController;
