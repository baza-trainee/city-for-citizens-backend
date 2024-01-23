const ctrlWrapper = require('../../helpers/ctrlWrapper');
const imageProcessing = require('./imageProcessing');
const fs = require('fs').promises;
const path = require('path');
const db = require('../../models');

const DIR_PARTNERS_IMAGES =
  process.env.DIR_PARTNERS_IMAGES || 'public/images/partners';

const createPartnerController = ctrlWrapper(async (req, res, next) => {
  await imageProcessing(req, res, next);

  const { name, link } = req.body;
  const imageBuffer = req.imageBuffer;
  const uniqueSuffix = Date.now();
  const ext = '.jpg';
  const fileName = `partner${uniqueSuffix}${ext}`;
  const filePath = path.join(DIR_PARTNERS_IMAGES, fileName);

  await fs.writeFile(filePath, imageBuffer);

  const newPartner = await db.Partners.create({
    name,
    link,
    image: fileName,
  });

  res.status(201).json(newPartner);
});

module.exports = createPartnerController;
