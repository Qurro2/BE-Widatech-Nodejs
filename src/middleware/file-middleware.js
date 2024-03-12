import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const fileUploadMiddleware = upload.fields([
  { name: "image", maxCount: 1 },
  {
    name: "photo",
    maxCount: 1,
  },
]);

export default fileUploadMiddleware;
