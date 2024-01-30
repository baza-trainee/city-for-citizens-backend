const ctrlWrapper = require('../../helpers/ctrlWrapper');
const db = require('../../models');
const dir =
  process.env.DIR_DOCUMENTS_FILES.replace('public/', '') || 'documents';

const getDocumentsController = ctrlWrapper(async (req, res) => {
  const { id } = req.params;

  const documents = await db.Documents.findAll({
    where: { ...(id && { id }) },
  });

  if (documents.length === 0) {
    return res.status(404).json({ message: 'Not found' });
  }

  const modifiedDocuments = documents.map(
    ({ id, file, name, createdAt, updatedAt }) => ({
      id,
      file: `${process.env.API_URL}/${dir}/${file}`,
      name,
      createdAt,
      updatedAt,
    })
  );

  res.status(200).json(modifiedDocuments);
});

module.exports = getDocumentsController;
