import express from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/userRouter.js";
import views from "./routes/viewsRouter.js";
import sequelize from "./models/config.js";
import espacoRouter from "./routes/espacoRouter.js";
import {fileURLToPath} from "url";
import {dirname, join} from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));
app.use("/", views);
app.use("/", userRouter);
app.use("/", espacoRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

process.on("SIGINT", () => {
  sequelize.close().then(() => {
    console.log("Conexão com o banco de dados fechada.");
    process.exit();
  });
});
