import {where} from "sequelize";
import espaco from "../models/espaco.js";

const viewAddEspaco = async (req, res) => {
  const locals = {
    title: "Reservas | Grupo O",
    description: "Página de Cadastro de Espaço",
  };
  res.render("addEspaco", locals);
};

const addEspaco = async (req, res) => {
  const {nome, descricao, capacidade, local, img} = req.body;
  try {
    if (!nome || !local || !capacidade || !descricao || !img) {
      return res.status(400).json({err: "Preencha todos os campos!"});
    }

    const novoEspaco = await espaco.create({
      nome: nome,
      local: local,
      descricao: descricao,
      capacidade: capacidade,
      imagem: img,
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

const viewEditEspaco = async (req, res) => {
  const {id} = req.params;

  const locals = {
    title: "Reservas | Grupo O",
    description: "Página de Edição de Espaço",
    id: id,
  };

  res.render("editEspaco", locals);
};

const editEspaco = async (req, res) => {
  const {id, nome, descricao, local, capacidade, img} = req.body;

  console.log("oi", id, nome, descricao, local, capacidade, img);
  if (!id || !nome || !descricao || !local || !capacidade || !img) {
    return res.status(400).json({err: "Preencha todos os campos!"});
  }

  const editado = await espaco.update(
    {nome, descricao, local, capacidade, imagem: img},
    {where: {espaco_id: id}}
  );

  if (editado[0] === 0) {
    return res.status(400).json({err: "Não foi possivel editar!"});
  }

  return res.status(200).send();
};

const viewDeletEspaco = async (req, res) => {
  try {
    const {id} = req.params;
    return res.render("deletEspaco", {id: id});
  } catch (ex) {
    console.log("err", ex);
  }
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
};

export default {
  viewAddEspaco,
  addEspaco,
  lerEspacos,
  lerEspaco,
  viewEditEspaco,
  editEspaco,
  viewDeletEspaco,
  deletEspaco,
};
