import {where} from "sequelize";
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
  const response = await espaco.findOne({
    where: {espaco_id: id},
  });

  return res.status(200).json(response);
};

const editEspaco = async (req, res) => {
  const {id, nome, descricao, local, capacidade} = req.body;
  if (!id || !nome || !descricao || !local || !capacidade) {
    return res.status(400).json({err: "Preencha todos os campos!"});
  }

  const editado = await espaco.update(
    {nome, descricao, local, capacidade},
    {where: {espaco_id: id}}
  );

  if (editado[0] === 0) {
    return res.status(400).json({err: "Não foi possivel editar!"});
  }

  return res.status(200).send();
};

const deletEspaco = async (req, res) => {
  const {id} = req.body;
  if (!id) {
    return res.status(400).json({err: "Não é possível excluir espaço!"});
  }

  const deletado = await espaco.destroy({where: {espaco_id: id}});

  if (deletado === 0) {
    return res.status(400).json({err: "Não foi possivel excluir!"});
  }

  return res.status(200).send();
  console.log("deletado", deletado);
};
export default {addEspaco, lerEspacos, lerEspaco, editEspaco, deletEspaco};
