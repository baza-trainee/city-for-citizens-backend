const multer = require('multer');

const storage = multer.memoryStorage();

const multerConfig = multer({
  storage: storage,
  limits: { fileSize: 25 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          'Invalid file type. Only JPEG, PNG and GIF files are allowed.'
        ),
        false
      );
    }
  },
});

const uploadSingleAsync = async (field, req, res) => {
  return new Promise((resolve, reject) => {
    multerConfig.single(field)(req, res, err => {
      if (err instanceof multer.MulterError) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = uploadSingleAsync;
