const fs = require('fs');
const sharp = require('sharp');
const multer = require('multer');
const path = require('path');

const imageMiddleware = (req, res, next) => {
  const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
      const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
      if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type.'));
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
    const fileName = `event${timestamp}.jpg`;
    const directoryPath = path.join('public', 'images', 'events');
    const filePath = path.join(directoryPath, fileName);

    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    sharp(file.buffer)
      .resize(788, (788 / 4) * 3, {
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

        req.imageFilePath = filePath;
        next();
      });
  });
};

module.exports = imageMiddleware;
