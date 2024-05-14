import sequelize from "./config.js";
import {DataTypes} from "sequelize";
import reserva from "./reserva.js";

const espaco = sequelize.define(
  "espacos",
  {
    espaco_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    descricao: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imagem: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default espaco;
