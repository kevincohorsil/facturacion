import Producto from '../../../models/INV_PRODUCTOS.js'
import Correlativo from '../../../models/CORRELATIVOS.js'
import { Op } from 'sequelize'

export const getAll = async (req, res) => {
  // Lógica para obtener el horario desde la base de datos
  const { page, limit } = req.query
  let Result
  const pagina = page ? page : 1 // Número de página que deseas obtener
  const elementosPorPagina = limit ? parseInt(limit, 10) : 2 // Número de página que deseas obtener

  await Producto.findAll({
    offset: (pagina - 1) * elementosPorPagina,
    limit: elementosPorPagina,
  }).then((data) => {
    if (data) {
      Result = data.map((data, index) => ({
        codigo: data.CODIGO,
        producto: data.PRODUCTO,
        precio: data.PRECIO,
        descripcion: data.DESCRIPCION,
        impuesto: data.IMPUESTO,
        estado: data.ESTADO,
      }))
    }
  })

  res.json(Result)
}

export const getById = async (req, res) => {
  // Lógica para obtener el horario desde la base de datos

  let Result
  await Producto.findAll({ where: { CODIGO: req.params.id } }).then((data) => {
    if (data) {
      Result = data.map((data, index) => ({
        codigo: data.CODIGO,
        producto: data.PRODUCTO,
        precio: data.PRECIO,
        descripcion: data.DESCRIPCION,
        impuesto: data.IMPUESTO,
        estado: data.ESTADO,
      }))
    }
  })
  res.json(Result)
}

export const getSearch = async (req, res) => {
  // Lógica para obtener el horario desde la base de datos
  const { id, producto, descripcion, page, limit } = req.query
  const pagina = page ? page : 1 // Número de página que deseas obtener
  const elementosPorPagina = limit ? parseInt(limit, 10) : 2 // Número de página que deseas obtener

  let condiciones = {}

  // Si se proporciona el ID, agregar condición de igualdad
  if (id) {
    condiciones.CODIGO = {
      [Op.eq]: id,
    }
  }

  // Si se proporciona el nombre, agregar condición de LIKE
  if (producto) {
    condiciones.PRODUCTO = {
      [Op.like]: `%${producto}%`,
    }
  }

  if (descripcion) {
    condiciones.DESCRIPCION = {
      [Op.like]: `%${descripcion}%`,
    }
  }

  let Result
  await Producto.findAll(
    {
      offset: (pagina - 1) * elementosPorPagina,
      limit: elementosPorPagina,
    },
    {
      where: condiciones,
    },
  ).then((data) => {
    if (data) {
      Result = data.map((data, index) => ({
        codigo: data.CODIGO,
        producto: data.PRODUCTO,
        precio: data.PRECIO,
        descripcion: data.DESCRIPCION,
        impuesto: data.IMPUESTO,
        estado: data.ESTADO,
      }))
    }
  })

  res.json(Result)
}

export const insert = async (req, res) => {
  // Lógica para obtener el horario desde la base de datos
  try {
    const correlativo = await obtenerCorrelativo()
    console.log(Correlativo)

    const { producto, proveedor, linea, descripcion } = req.body

    const resultadoValidacion = await ValidadNombre(producto)

    if (resultadoValidacion) {
      throw new Error('El producto con el nombre existe')
    }

    const newRecord = await Producto.create({
      CODIGO: correlativo.CORRELATIVO,
      PRODUCTO: producto,
      PROVEEDOR: proveedor,
      LINEA: linea,
      DESCRIPCION: descripcion,
      COSTO: 0,
      PRECIO: 0,
      IMPUESTO: 0,
    })

    aumentarCorrelativo(correlativo.CORRELATIVO)

    res.json(newRecord)
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(403)

      res.send({ status: 'error', message: 'Producto ya Existe' })
    } else {
      res.status(500)
      res.send({ status: 'error', message: error.message })
    }
  }
}

export const update = async (req, res) => {
  // Lógica para obtener el horario desde la base de datos
  try {
    const { id } = req.params

    const { producto, proveedor, linea, descripcion } = req.body
    console.log(req.body)
    const updateRecord = await Producto.update(
      {
        PRODUCTO: producto,
        PROVEEDOR: proveedor,
        LINEA: linea,
        DESCRIPCION: descripcion,
      },
      {
        where: { CODIGO: id },
      },
    )

    if (updateRecord) {
      let Result = await Producto.findByPk(id)
      res.json(Result)
    }
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(403)

      res.send({ status: 'error', message: 'ERROR con el producto' })
    } else {
      res.status(500)
      res.send({ status: 'error', message: error.message })
    }
  }
}

const ValidadNombre = async (producto) => {
  const productoEncontrado = await Producto.findOne({
    where: { PRODUCTO: producto },
  })

  let valor
  productoEncontrado ? (valor = 1) : (valor = null)
  return valor
}

const obtenerCorrelativo = async () => {
  const productoEncontrado = await Correlativo.findOne({
    where: { TIPO: 'Productos' },
  })

  return productoEncontrado
}

const aumentarCorrelativo = async (correlativo) => {
  const updateRecord = await Correlativo.update(
    {
      CORRELATIVO: correlativo + 1,
    },
    {
      where: { TIPO: 'Productos' },
    },
  )

  return 0
}
