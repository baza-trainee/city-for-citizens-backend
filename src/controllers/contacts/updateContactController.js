const ctrlWrapper = require('../../helpers/ctrlWrapper');
const { updateContact } = require('../../services/contactsService');

const updateContactController = ctrlWrapper(async (req, res) => {
  const { email, phone } = req.body;

  const updatedContact = await updateContact({ email, phone });

  res.status(201).json(updatedContact);
});

module.exports = updateContactController;
