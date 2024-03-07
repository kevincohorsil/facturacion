import { Sequelize, DataTypes } from 'sequelize'
import { sequelize } from '../src/db/conextion.js'
const Correlativo = sequelize.define(
  'CORRELATIVOS',
  {
    TIPO: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true,
    },
    CORRELATIVO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    tableName: 'CORRELATIVOS',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: 'PK_Correlativos',
        unique: true,
        fields: [{ name: 'TIPO' }],
      },
    ],
  },
)

export default Correlativo
