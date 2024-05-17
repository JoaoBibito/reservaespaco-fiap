import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginUser = async (req, res) => {
  const {email, senha} = req.body;
  if (!email || !senha) {
    return res.status(400).json({err: "Preencha os campos!"});
  }
  try {
    const resDB = await user.findOne({
      where: {
        email,
      },
    });

    if (!resDB) {
      return res.status(400).json({err: "Usuario ou senhas inválidos!"});
    }

    const novaSenha = bcrypt.compareSync(senha, resDB.senha);

    if (!novaSenha) {
      return res.status(400).json({err: "Usuario ou senhas inválidos!"});
    }

    const token = await geraToken({
      nome: resDB.nome,
      tipo: resDB.tipo,
      id: resDB.user_id,
    });
    console.log("token", token);
    return res.status(200).json({
      nome: resDB.nome,
      user_id: resDB.user_id,
      user_tipo: resDB.tipo,
      token: token,
    });
  } catch (ex) {
    console.log("rr", ex);
  }
};

const createUser = async (req, res) => {
  let err = null;
  const {nome, email, senha, confirmSenha} = req.body;
  if (!nome || !email || !senha || !confirmSenha) {
    return res.render("cadastro", {
      err: "Por favor, preencha todos os campos.",
    });
  }
  if (senha !== confirmSenha) {
    return res.status(400).json({err: "As senhas não coincidem."});
  }
  const novaSenha = bcrypt.hashSync(senha, 5);

  const now = new Date();
  now.setHours(now.getHours() - 3);

  const formattedDateTime = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(
    now.getHours()
  ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  const novoUser = await user.create({
    nome: nome,
    senha: novaSenha,
    tipo: "Operador",
    email: email,
    createdAt: formattedDateTime,
  });

  setTimeout(() => {
    return res.render("login");
  }, 1500);
};

async function geraToken(data) {
  const {nome, tipo, id} = data;

  if (!nome || !tipo || !id) {
    return null;
  }

  const token = jwt.sign(
    {
      user_id: id,
      user_nome: nome,
      user_tipo: tipo,
    },
    process.env.SECRET_JWT
  );
  return token;
}
export default {
  loginUser,
  createUser,
};
