const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Multer disk storage settings
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'Images');
    },
    filename: function(req, file, cb) {   
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const fileExtension = path.extname(file.originalname);
        const fileName = `${uuidv4()}-${uniqueSuffix}${fileExtension}`;
        cb(null, fileName);
    }
});

// Multer file filter settings
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

// Multer instance with disk storage and file filter settings
const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;
