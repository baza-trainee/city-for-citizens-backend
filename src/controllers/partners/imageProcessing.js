const sharp = require('sharp');

const imageProcessing = async (req, res, next) => {
  const data = await sharp(req.file.buffer)
    .resize(250, 187, {
      fit: sharp.fit.outside,
      withoutEnlargement: true,
    })
    .sharpen({
      sigma: 0.75,
      m1: 0,
      m2: 3,
      x1: 2,
      y2: 10,
      y3: 20,
    })
    .modulate({
      saturation: 1.1,
    })
    .toColourspace('srgb')
    .jpeg({ mozjpeg: true })
    .toBuffer();
  req.imageBuffer = data;
};

module.exports = imageProcessing;
