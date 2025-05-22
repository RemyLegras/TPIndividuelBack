const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
app.use(express.json());

const PORT = 8080;

dotenv.config();

app.use(cors({ origin: "http://localhost:3000" }));

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://root:example@localhost:27017/TP", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: "admin",
  })
  .then(() => {
    console.log("Connexion à la base de données réussie");
  })
  .catch((err) => {
    console.log("Erreur lors de la connexion à la base de données", err);
  });

app.use("/users", require("./Routes/usersRoutes"));
app.use("/publication", require("./Routes/publicationRoutes"));
app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});