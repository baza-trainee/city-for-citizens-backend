const fs = require('fs');
const path = require('path');
const DIR_IMAGES = process.env.DIR_IMAGES || 'public/images/events';

const deleteImage = (eventImage, res) => {
  try {
    const filePath = path.join(DIR_IMAGES, eventImage);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`Deleted image: ${filePath}`);
      return true;
    } else {
      res.status(404).json({ error: 'Image not found' });
      return false;
    }
  } catch (error) {
    res.status(500).json({ error: `Error deleting image: ${error.message}` });
    return false;
  }
};

module.exports = deleteImage;
