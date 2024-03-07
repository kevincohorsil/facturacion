import { Router } from 'express'
import * as ProductoController from './ProductoController.js'

const router = Router()

// Ruta: GET /products
router.get('/producto', ProductoController.getAll)
router.get('/producto/search', ProductoController.getSearch)
router.get('/producto/:id', ProductoController.getById)

// Ruta: POST
router.post('/producto', ProductoController.insert)

// Ruta: PUT
router.put('/producto/:id', ProductoController.update)
export default router
