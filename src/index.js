import express from 'express'
import cors from 'cors'
import { sequelize } from './db/conextion.js'
import routerProducto from '../src/router/Producto/index.js'
// Router

const app = express()

app.use(express.json())

app.use(cors())

app.use('/api', routerProducto)

try {
  await sequelize.authenticate()
  console.log('Connection has been established successfully.')
} catch (error) {
  console.error('Unable to connect to the database:', error)
}

//app.listen(3000)
var port = process.env.PORT || 3000

app.listen(port, '0.0.0.0', function () {
  console.log('Puerto ' + port + ' iniciado.//')
})
console.log('Server Port', port)
