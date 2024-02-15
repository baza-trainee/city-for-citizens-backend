const ctrlWrapper = require('../../helpers/ctrlWrapper');
const { updateContact } = require('../../services/contactsService');

const updateContactController = ctrlWrapper(async (req, res) => {
  const { email, firstPhone, secondPhone } = req.body;

  const updatedContact = await updateContact({
    email,
    firstPhone,
    secondPhone,
  });

  res.status(201).json({
    status: 'success',
    message: 'Contact updated successfully',
    data: updatedContact,
  });
});

module.exports = updateContactController;
