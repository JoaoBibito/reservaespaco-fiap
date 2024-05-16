import sequelize from "../models/config.js";
import {Sequelize} from "sequelize";
import reserva from "../models/reserva.js";

const viewReservaEspaco = (req, res) => {
  const {id} = req.params;
  const locals = {
    title: "Reservas | Grupo O",
    description: "Página de Reserva de Espaço",
    id,
  };
  return res.render("reservaEspaco", locals);
};
const reservaEspaco = async (req, res) => {
  const {reserva_inicio, reserva_fim, descricao, user_id, espaco_id, dia} =
    req.body;

  if (
    !reserva_inicio ||
    !reserva_fim ||
    !descricao ||
    !user_id ||
    !espaco_id ||
    !dia
  ) {
    return res.status(400).json({err: "Preencha todos os campos!"});
  }

  console.log("datas", reserva_fim, reserva_inicio);
  const response = await reserva.findAll({
    where: {
      espaco_id: espaco_id,
      reserva_inicio: {
        [Sequelize.Op.lte]: `${dia} ${reserva_inicio}`,
      },
      reserva_fim: {
        [Sequelize.Op.gte]: `${dia} ${reserva_fim}`,
      },
      espaco_id: espaco_id,
    },
  });

  if (response.length > 0) {
    return res.status(400).json({err: "Existe reserva neste horário."});
  }

  const novaReserva = await reserva.create({
    reserva_inicio: `${dia} ${reserva_inicio}`,
    reserva_fim: `${dia} ${reserva_fim}`,
    descricao: descricao,
    user_id: user_id,
    espaco_id: espaco_id,
  });

  if (!novaReserva) {
    return res.status(400).json({err: "Não foi possível criar a reserva."});
  }

  return res.status(200).json({res: "Reserva criada com sucesso!"});
};

const buscaReservasPorEspaco = async (req, res) => {
  const {espaco_id} = req.body;
  if (!espaco_id) {
    return res.status(400).json({err: "Preencha todos os campos!"});
  }

  const reservas = await reserva.findAll({where: {espaco_id}});

  return res.status(200).send(reservas);
};

const buscaReservaPorDia = async (req, res) => {
  const {espaco_id, dia} = req.body;
  if (!espaco_id || !dia) {
    return res.status(400).json({err: "Preencha todos os campos!"});
  }
  try {
  } catch (ex) {
    console.log("err", ex);
  }
  const reservas = await reserva.findAll({
    where: {
      espaco_id,
      reserva_inicio: {[Sequelize.Op.gt]: `${dia}T00:00:00`},
      reserva_fim: {[Sequelize.Op.lt]: `${dia}T23:59:00`},
    },
    order: [["reserva_inicio", "ASC"]],
  });

  res.status(200).send(reservas);
};

export default {
  viewReservaEspaco,
  reservaEspaco,
  buscaReservasPorEspaco,
  buscaReservaPorDia,
};
