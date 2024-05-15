import express from "express";
import expressLayouts from "express-ejs-layouts";
import bodyParser from "body-parser";
import views from "./routes/viewsRoutes.js";
import userRouter from "./routes/userRoutes.js";
import espacoRouter from "./routes/espacoRoutes.js";
import reservaRouter from "./routes/reservaRoutes.js";
import sequelize from "./models/config.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static("public"));
app.use(expressLayouts);

app.set("view engine", "ejs");
app.set("layout", "./layout/main.ejs");
app.set("views", "./views");
app.use("/", views);
app.use("/", userRouter);
app.use("/", espacoRouter);
app.use("/", reservaRouter);

app.get("*", function (req, res) {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

process.on("SIGINT", () => {
  sequelize.close().then(() => {
    console.log("Conexão com o banco de dados fechada.");
    process.exit();
  });
});
