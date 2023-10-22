const ctrlWrapper = require('../../helpers/ctrlWrapper');
const createImage = require('../../services/createImage');

const createImageController = ctrlWrapper(async (req, res) => {
  const eventImage = await createImage(req, res);

  res.status(201).json({ eventImage });
});

module.exports = createImageController;
