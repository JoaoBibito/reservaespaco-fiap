import espaco from "../models/espaco.js";

const addEspaco = async (req, res) => {
  const {nome, descricao, capacidade, local} = req.body;

  try {
    if (!nome || !local || !capacidade || !descricao) {
      return res.status(400).json({err: "Preencha todos os campos!"});
    }

    const novoEspaco = await espaco.create({
      nome: nome,
      local: local,
      descricao: descricao,
      capacidade: capacidade,
    });

    setTimeout(() => {
      console.log("oiiiii");
      return res.render("home");
    }, 1500);
  } catch (ex) {
    console.log(ex);
  }
};

const lerEspacos = async (req, res) => {
  const response = await espaco.findAll();

  return res.status(200).json({res: response});
};

const lerEspaco = async (req, res) => {
  const {id} = req.body;
  console.log("req", req.body);
  const response = await espaco.findOne({
    where: {espaco_id: id},
  });

  console.log(response);

  return res.status(200).json({res: response});
};

const editEspaco = async (req, res) => {};
export default {addEspaco, lerEspacos, lerEspaco, editEspaco};