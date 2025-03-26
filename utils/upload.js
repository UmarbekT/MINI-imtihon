const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const fileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
        return cb(new Error("Faqat rasm yuklash mumkin"), false);
    }
    cb(null, true);
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, 
    fileFilter: fileFilter
});

module.exports = upload;
