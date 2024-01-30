const ctrlWrapper = require('../../helpers/ctrlWrapper');
const db = require('../../models');

const getPartnersController = ctrlWrapper(async (req, res) => {
  const { id } = req.query;

  const partners = await db.Partners.findAll({ where: { ...(id && { id }) } });

  if (partners.length === 0) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.status(200).json(partners);
});

module.exports = getPartnersController;
