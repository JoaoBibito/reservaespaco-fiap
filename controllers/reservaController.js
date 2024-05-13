import reserva from "../models/reserva.js";
const reservaEspaco = async (req, res) => {
  const {reserva_inicio, reserva_fim, descricao, user_id, espaco_id} = req.body;

  if (!reserva_inicio || !reserva_fim || !descricao || !user_id || !espaco_id) {
    return res.status(400).json({err: "Preencha todos os campos!"});
  }

  const novaReserva = reserva.create();
};

const buscaReservasPorEspaco = async (req, res) => {
  const {espaco_id} = req.body;
  if (!espaco_id) {
    return res.status(400).json({err: "Preencha todos os campos!"});
  }

  const reservas = await reserva.findAll({where: {espaco_id}});

  return res.status(200).send(reservas);
};
export default {reservaEspaco, buscaReservasPorEspaco};
