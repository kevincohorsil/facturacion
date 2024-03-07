import Horario from '../../../models/Horario.js'
import Receta from '../../../models/Receta.js'
import { Op } from 'sequelize'

export const getAll = async (req, res) => {
  // Lógica para obtener el horario desde la base de datos
  let Result
  await Horario.findAll({
    include: [
      {
        model: Receta,
        as: 'receta',
        attributes: ['nombre'],
      },
    ],
  }).then((data) => {
    if (data) {
      Result = data.map((data, index) => ({
        id: data.id,
        fecha: data.fecha,
        idReceta: data.idReceta,
        estado: data.estado,
        receta: data.receta ? data.receta.nombre : '', // Campo de descripción de la categoría
      }))
    }
  })

  res.json(Result)
}

export const getById = async (req, res) => {
  // Lógica para obtener el horario desde la base de datos
  let Result
  await Receta.findAll({
    include: [
      {
        model: Receta,
        as: 'receta',
        attributes: ['nombre'],
      },
    ],
    where: { id: req.params.id },
  }).then((data) => {
    if (data) {
      Result = data.map((data, index) => ({
        id: data.id,
        fecha: data.fecha,
        idReceta: data.idReceta,
        estado: data.estado,
        receta: data.receta ? data.receta.nombre : '', // Campo de descripción de la categoría
      }))
    }
  })

  res.json(Result)
}

export const getSearch = async (req, res) => {
  // Lógica para obtener el horario desde la base de datos
  let Result
  await Receta.findAll({
    include: [
      {
        model: Receta,
        as: 'receta',
        attributes: ['nombre'],
      },
    ],
    where: {
      [Op.or]: [{ id: { [Op.like]: `%${search}%` } }],
    },
  }).then((data) => {
    if (data) {
      Result = data.map((data, index) => ({
        id: data.id,
        fecha: data.fecha,
        idReceta: data.idReceta,
        estado: data.estado,
        receta: data.receta ? data.receta.nombre : '', // Campo de descripción de la categoría
      }))
    }
  })

  res.json(Result)
}

export const insert = async (req, res) => {
  // Lógica para obtener el horario desde la base de datos
  try {
    const { fecha, idReceta } = req.body
    const parsedFecha = new Date(fecha)
    const formattedFecha = isNaN(parsedFecha)
      ? null
      : parsedFecha.toISOString().slice(0, 10)
    const newRecord = await Horario.create({
      formattedFecha,
      idReceta,
    })

    res.json(newRecord)
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(403)

      res.send({ status: 'error', message: 'Costumer ya Existe' })
    } else {
      res.status(500)
      res.send({ status: 'error', message: error.message })
    }
  }
}

export const update = async (req, res) => {
  // Lógica para obtener el horario desde la base de datos
  try {
    const id = req.params.id
    const { fecha, idReceta } = req.body
    const formattedFecha = fecha
      ? new Date(fecha).toISOString().slice(0, 10)
      : null

    console.log(formattedFecha)

    const updateRecord = await Horario.update(
      {
        formattedFecha,
        idReceta,
      },
      {
        where: { id: id },
      },
    )

    if (updateRecord) {
      let Result = await Horario.findByPk(id)
      res.json(Result)
    }
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(403)

      res.send({ status: 'error', message: 'Costumer ya Existe' })
    } else {
      res.status(500)
      res.send({ status: 'error', message: error.message })
    }
  }
}
