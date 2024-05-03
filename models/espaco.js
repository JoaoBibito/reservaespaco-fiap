import sequelize from "./config.js";
import {DataTypes} from "sequelize";
import reserva from "./reserva.js";

const espaco = sequelize.define("espaco", {
  espaco_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  local: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

espaco.associations;
export default espaco;
