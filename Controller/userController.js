const bcrypt = require("bcryptjs");
const User = require("../Model/userModel");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    if (!req.body.password) {
      return res.status(400).send({ error: "Mot de passe requis" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      ...req.body,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).send(user);
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).send({ error: `Cet email existe déja` });
    }
    res.status(400).send({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send({ error: "Utilisateur introuvable" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(401).send({ error: "Mot de passe invalide" });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).send({ message: "Connexion réussi", token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send({ error: "Utilisateur introuvable" });
    }

    res.status(200).send({ message: "Utilisateur supprimé", user });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!user) {
      return res.status(404).send({ error: "Utilisateur introuvable" });
    }

    res.status(200).send({ message: "Utilisateur mis à jour", user });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { 
  registerUser, loginUser, deleteUser, updateUser, getUsers, getMe 
};
