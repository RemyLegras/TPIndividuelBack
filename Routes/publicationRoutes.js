const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  createPublication,
  getPublications,
  getPublicationById,
  updatePublication,
  deletePublication,
} = require("../Controller/publicationController");
const authMiddleware = require("../Middleware/authMiddleware");

const Publication = require("../Model/publicationModel");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

const checkAuthor = async (req, res, next) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) {
      return res.status(404).send({ error: "Publication introuvable" });
    }
    if (publication.author.toString() !== req.user._id) {
      return res.status(403).send({ error: "Mauvais utilisateur" });
    }
    next();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

router.post("/", authMiddleware, upload.single("image"), createPublication);
router.get("/", getPublications);
router.get("/:id", getPublicationById);
router.put("/:id", authMiddleware, checkAuthor, upload.single("image"), updatePublication);
router.delete("/:id", authMiddleware, deletePublication);

module.exports = router;