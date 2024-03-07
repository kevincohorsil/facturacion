import { Sequelize, DataTypes } from 'sequelize'
import { sequelize } from '../src/db/conextion.js'
const Lineas = sequelize.define(
  'INV_LINEAS',
  {
    LINEA: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    DESCRIPCION: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'INV_LINEAS',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: 'PK_INV_LINEAS',
        unique: true,
        fields: [{ name: 'LINEA' }],
      },
    ],
  },
)
export default Lineas
