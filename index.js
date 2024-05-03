import express from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/user.route.js";
import views from "./routes/views.routes.js";
import sequelize from "./models/config.js";
const app = express();
const PORT = process.env.PORT || 8080;

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", views);

app.use("/", userRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

process.on("SIGINT", () => {
  sequelize.close().then(() => {
    console.log("Conexão com o banco de dados fechada.");
    process.exit();
  });
});
