import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize({
  dialect: 'mssql',
  dialectOptions: {
    options: {
      // Configuración específica de MSSQL
      // ...
    },
  },
  host: 'DESKTOP-43QQ15S',
  port: '1433',
  database: 'BDCore1',
  username: 'admin',
  password: '2024Pr0y3ct',
})

//export const sequelizesqlite = new Sequelize({
//  dialect: 'sqlite',
//  storage: 'database.sqlite', // Nombre del archivo de la base de datos SQLite
//})

// Verificar la conexión a la base de datos
