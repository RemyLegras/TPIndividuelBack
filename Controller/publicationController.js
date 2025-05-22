const Publication = require("../Model/publicationModel");

const createPublication = async (req, res) => {
  try {
    let categories = req.body.categories;
    if (typeof categories === "string") {
      try {
        categories = JSON.parse(categories);
      } catch {
        categories = [categories];
      }
    }

    const publication = new Publication({
      ...req.body,
      categories,
      author: req.user._id,
      image: req.file ? req.file.filename : undefined,
    });

    await publication.save();

    res.status(201).send(publication);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getPublications = async (req, res) => {
  try {
    const filters = {};

    if (req.query.title) {
      filters.title = { $regex: req.query.title, $options: "i" };
    }

    if (req.query.content) {
      filters.content = { $regex: req.query.content, $options: "i" };
    }

    const publications = await Publication.find(filters).populate(
      "author",
      "email username"
    );

    res.status(200).send(publications);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getPublicationById = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id).populate(
      "author",
      "email username"
    );

    if (!publication) {
      return res.status(404).send({ error: "Publication introuvable" });
    }

    res.status(200).send(publication);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const updatePublication = async (req, res) => {
  try {
    let categories = req.body.categories;
    if (typeof categories === "string") {
      try {
        categories = JSON.parse(categories);
      } catch {
        categories = [categories];
      }
    }
    const updateData = {
      title: req.body.title,
      content: req.body.content,
      categories,
    };
    if (req.file) {
      updateData.image = req.file.filename;
    }
    const updated = await Publication.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ message: "Publication introuvable" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la modification", error: err });
  }
};

const deletePublication = async (req, res) => {
  try {
    const publication = await Publication.findByIdAndDelete(req.params.id);

    if (!publication) {
      return res.status(404).send({ error: "Publication introuvable" });
    }

    res.status(200).send({ message: "Publication supprimé", publication });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  createPublication,
  getPublications,
  getPublicationById,
  updatePublication,
  deletePublication,
};