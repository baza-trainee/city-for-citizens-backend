const ctrlWrapper = require('../../helpers/ctrlWrapper');
const deleteImage = require('../../services/deleteImage');

const deleteImageController = ctrlWrapper(async (req, res) => {
  const { eventImage } = req.body;

  if (!eventImage) {
    res.status(404).json({ error: 'Image not found or could not be deleted' });
  }

  const isDeleted = await deleteImage(eventImage, res);

  if (isDeleted) {
    res.status(200).json({ message: 'Image deleted successfully' });
  } else {
    res.status(404).json({ error: 'Image not found or could not be deleted' });
  }
});

module.exports = deleteImageController;
