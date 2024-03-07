import { Sequelize, DataTypes } from 'sequelize'
import { sequelize } from '../src/db/conextion.js'
const Producto = sequelize.define(
  'INV_PRODUCTOS',
  {
    CODIGO: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
    },
    PRODUCTO: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    PRECIO: {
      type: DataTypes.DECIMAL(19, 4),
      allowNull: true,
    },
    COSTO: {
      type: DataTypes.DECIMAL(19, 4),
      allowNull: true,
    },
    PROVEEDOR: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    LINEA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    DESCRIPCION: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    IMPUESTO: {
      type: DataTypes.CHAR(10),
      allowNull: true,
    },
    ESTADO: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'INV_PRODUCTOS',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: 'PK_INV_PRODUCTOS',
        unique: true,
        fields: [{ name: 'CODIGO' }],
      },
    ],
  },
)
export default Producto
