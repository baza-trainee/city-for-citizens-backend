const fs = require('fs');
const sharp = require('sharp');
const multer = require('multer');
const path = require('path');

const DIR_IMAGES = process.env.DIR_IMAGES || 'public/images/events';

const createImage = (req, res) => {
  return new Promise((resolve, reject) => {
    const upload = multer({
      storage: multer.memoryStorage(),
      fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedMimes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          return res.status(400).json({ error: 'Invalid file type' });
        }
      },
    });

    upload.single('file')(req, res, err => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error uploading file' });
      }

      const file = req.file;

      if (!file) {
        return res.status(400).json({ error: 'No file uploaded.' });
      }

      const timestamp = Date.now();
      const eventImage = `event${timestamp}.jpg`;

      const filePath = path.join(DIR_IMAGES, eventImage);

      if (!fs.existsSync(DIR_IMAGES)) {
        fs.mkdirSync(DIR_IMAGES, { recursive: true });
      }

      sharp(file.buffer)
        .resize(1280, (1280 / 4) * 3, {
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
        .clahe({
          width: 50,
          height: 50,
        })
        .modulate({
          saturation: 1.1,
        })
        .toColourspace('srgb')
        .jpeg({ mozjpeg: true })
        .toFile(filePath, (err, info) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error image processing' });
          }

          resolve(eventImage);
        });
    });
  });
};

module.exports = createImage;
