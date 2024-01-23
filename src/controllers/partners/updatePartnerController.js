const ctrlWrapper = require('../../helpers/ctrlWrapper');
const imageProcessing = require('./imageProcessing');
const fs = require('fs').promises;
const path = require('path');
const db = require('../../models');

const DIR_PARTNERS_IMAGES =
  process.env.DIR_PARTNERS_IMAGES || 'public/images/partners';

const updatePartnerController = ctrlWrapper(async (req, res, next) => {
  const { id } = req.params;

  const existingPartner = await db.Partners.findByPk(id);
  if (!existingPartner) {
    return res.status(404).json({ message: 'Partner not found' });
  }

  if (req.file) {
    await imageProcessing(req, res, next);

    const imageBuffer = req.imageBuffer;
    const uniqueSuffix = Date.now();
    const ext = '.jpg';
    const fileName = `partner${uniqueSuffix}${ext}`;
    const filePath = path.join(DIR_PARTNERS_IMAGES, fileName);

    await fs.writeFile(filePath, imageBuffer);

    if (existingPartner.image) {
      const previousImagePath = path.join(
        DIR_PARTNERS_IMAGES,
        existingPartner.image
      );
      await fs.unlink(previousImagePath);
    }

    await existingPartner.update({
      name: req.body.name || existingPartner.name,
      link: req.body.link || existingPartner.link,
      image: fileName,
    });
  } else {
    await existingPartner.update({
      name: req.body.name || existingPartner.name,
      link: req.body.link || existingPartner.link,
    });
  }

  res.status(200).json({ message: 'Partner updated successfully' });
});

module.exports = updatePartnerController;
