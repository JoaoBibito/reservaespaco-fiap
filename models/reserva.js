import sequelize from "./config.js";
import {DataTypes} from "sequelize";
import user from "./user.js";
import espaco from "./espaco.js";

const reserva = sequelize.define(
  "reserva",
  {
    reserva_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    reserva_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    reserva_fim: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "usuario",
        key: "user_id",
      },
    },
    espaco_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "espaco",
        key: "espaco_id",
      },
    },
  },
  {
    timestamps: false,
  }
);

export default reserva;
