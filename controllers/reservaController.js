import sequelize from "../models/config.js";
import {Sequelize} from "sequelize";
import reserva from "../models/reserva.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const viewReservaEspaco = (req, res) => {
  const {id} = req.params;
  const locals = {
    title: "Reservas | Grupo O",
    description: "Página de Reserva de Espaço",
    id: id,
  };
  return res.render("reservaEspaco", locals);
};
const reservaEspaco = async (req, res) => {
  const {reserva_inicio, reserva_fim, descricao, token, espaco_id, dia} =
    req.body;
  if (!reserva_inicio || !reserva_fim || !descricao || !espaco_id || !dia) {
    return res.status(400).json({err: "Preencha todos os campos!"});
  }

  const user = await jwt.verify(token, process.env.SECRET_JWT);
  const response = await reserva.findAll({
    where: {
      espaco_id: espaco_id,
      [Sequelize.Op.or]: [
        {
          reserva_inicio: {
            [Sequelize.Op.lte]: `${dia} ${reserva_inicio}`,
            [Sequelize.Op.gte]: `${dia} ${reserva_fim}`,
          },
        },
        {
          reserva_fim: {
            [Sequelize.Op.gte]: `${dia} ${reserva_inicio}`,
            [Sequelize.Op.lte]: `${dia} ${reserva_fim}`,
          },
        },
        {
          reserva_inicio: {
            [Sequelize.Op.lte]: `${dia} ${reserva_inicio}`,
          },
          reserva_fim: {
            [Sequelize.Op.gte]: `${dia} ${reserva_inicio}`,
          },
        },
        {
          reserva_inicio: {
            [Sequelize.Op.lte]: `${dia} ${reserva_fim}`,
          },
          reserva_fim: {
            [Sequelize.Op.gte]: `${dia} ${reserva_fim}`,
          },
        },
      ],
    },
  });

  if (response.length > 0) {
    return res.status(400).json({err: "Existe reserva neste horário."});
  }

  const novaReserva = await reserva.create({
    reserva_inicio: `${dia} ${reserva_inicio}`,
    reserva_fim: `${dia} ${reserva_fim}`,
    descricao: descricao,
    user_id: user.user_id,
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

const lerReserva = async (req, res) => {
  const {reserva_id} = req.body;
  if (!reserva_id) {
    return res.status(500).json({err: "Preencha todos os campos."});
  }

  const response = await reserva.findOne({
    where: {
      reserva_id: reserva_id,
    },
  });

  return res.status(200).json(response);
};
const viewTodasReservas = async (req, res) => {
  const locals = {
    title: "Reservas | Grupo O",
    description: "Página de todas reservas",
  };
  return res.render("todasReservas", locals);
};

const todasReservas = async (req, res) => {
  const {token} = req.body;
  const user = await jwt.verify(token, process.env.SECRET_JWT);

  if (user.user_tipo !== "Admin") {
    return res
      .status(401)
      .json({err: "Somente Administrador pode ver todas reservas."});
  }

  const response = await reserva.findAll({order: [["reserva_id", "DESC"]]});
  console.log("IYgouaifunerlifqerf", response);
  return res.status(200).json(response);
};
const viewDeletReserva = async (req, res) => {
  const {id} = req.params;
  const locals = {
    title: "Reservas | Grupo O",
    description: "Página de exclusão de reserva",
    id: id,
  };
  return res.render("deletReserva", locals);
};

const deletReserva = async (req, res) => {
  const {reserva_id, token} = req.body;
  const user = jwt.verify(token, process.env.SECRET_JWT);
  if (!reserva_id) {
    return res.status(500).json({err: "Preencha todos os campos."});
  }

  const response = await reserva.destroy({
    where: {
      reserva_id: reserva_id,
    },
  });

  if (!response) {
    return res.status(500).json({err: "Não foi possível deletar reserva."});
  }

  return res.status(200).json(response);
};

export default {
  viewReservaEspaco,
  reservaEspaco,
  buscaReservasPorEspaco,
  buscaReservaPorDia,
  lerReserva,
  viewTodasReservas,
  todasReservas,
  viewDeletReserva,
  deletReserva,
};
