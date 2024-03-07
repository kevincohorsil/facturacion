import { Sequelize, DataTypes } from 'sequelize'
import { sequelize } from '../src/db/conextion.js'
const Proveedores = sequelize.define(
  'COM_PROVEEDORES',
  {
    PROVEEDOR: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'COM_PROVEEDORES',
        key: 'PROVEEDOR',
      },
    },
    NOMBRE: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'COM_PROVEEDORES',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: 'PK_COM_PROVEEDORES',
        unique: true,
        fields: [{ name: 'PROVEEDOR' }],
      },
    ],
  },
)
export default Proveedores
