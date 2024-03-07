import { Router } from 'express'

const router = Router()

// Ruta: GET /users
router.get('/user', (req, res) => {
  res.send('Obtener todos los usuarios')
})

// Ruta: GET /users/:id
router.get('/:id', (req, res) => {
  const userId = req.params.id
  res.send(`Obtener usuario con ID ${userId}`)
})

export default router
