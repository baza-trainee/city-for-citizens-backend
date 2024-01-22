const HttpError = require('../helpers/HttpError');
const { Contacts } = require('../models');

async function getContacts() {
  const contacts = await Contacts.findAll();
  return contacts;
}

async function updateContact(updateData) {
  const existingContact = await Contacts.findOne();

  if (!existingContact) {
    throw new HttpError('Contact not found', 404);
  }

  const updatedContact = await existingContact.update(updateData);
  return updatedContact;
}

module.exports = {
  getContacts,
  updateContact,
};
