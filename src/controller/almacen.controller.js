const BD = require('../config/conexion');
class ControladorAlmacen {
  async obtenerProductos(req, res) {
    try {
      const queryProductos = 'SELECT * FROM productos';
      const productosObtenidos = await BD.awaitQuery(queryProductos);
      const productosAlmacen = await Promise.all(
        productosObtenidos.map(async (producto) => {
          const { id, nombre, descripcion, marca, precio, id_categoria } =
            producto;
          const [categoriaInformacion] = await BD.awaitQuery(
            'SELECT * FROM categorias WHERE id = ?',
            [id_categoria]
          );
          return {
            id,
            nombre,
            descripcion,
            marca,
            precio,
            id_categoria: categoriaInformacion.nombre,
          };
        })
      );
      if (!productosAlmacen.length) {
        return res.status(200).json('No existen producto en el almacen.');
      }
      res.status(200).json(productosAlmacen);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async obtenerProducto(req, res) {
    const { productoID } = req.params;
    try {
      const queryProducto = 'SELECT * from productos WHERE id = ?';
      const productoEncontrado = await BD.awaitQuery(queryProducto, [
        productoID,
      ]);
      if (!productoEncontrado.length) {
        return res.status(404).json('Este producto no existe.');
      }
      const productoId = await Promise.all(
        productoEncontrado.map(async (producto) => {
          const { id, nombre, descripcion, marca, precio, id_categoria } =
            producto;
          const [categoriaInformacion] = await BD.awaitQuery(
            'SELECT * FROM categorias WHERE id = ?',
            [id_categoria]
          );
          return {
            id,
            nombre,
            descripcion,
            marca,
            precio,
            id_categoria: categoriaInformacion.nombre,
          };
        })
      );
      res.status(200).json(productoId);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async crearProducto(req, res) {
    let { nombre, descripcion, marca, precio, id_categoria } = req.body;
    if (!nombre || !descripcion || !marca || !precio || !id_categoria) {
      return res.status(400).json('Todos los campos son obligatorios.');
    }
    if (isNaN(precio)) {
      return res.status(400).json('El precio debe ser un número.');
    }
    precio = Number(precio);
    try {
      const queryCategoria = 'SELECT id from categorias WHERE nombre = ?';
      const resultadoCategoria = await BD.awaitQuery(queryCategoria, [
        id_categoria,
      ]);
      if (!resultadoCategoria.length) {
        return res
          .status(404)
          .json('No existe una categoria con el nombre enviado.');
      }
      const queryCrearProducto =
        'INSERT INTO productos (nombre, descripcion, marca, precio, id_categoria) VALUES (?,?,?,?,?)';
      const resultado = await BD.awaitQuery(queryCrearProducto, [
        nombre,
        descripcion,
        marca,
        precio,
        resultadoCategoria[0].id,
      ]);
      if (resultado.insertId) {
        return res
          .status(201)
          .json('Producto agregado al almacen correctamente.');
      }
      res.status(400).json('El producto no fue creado.');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async eliminarProducto(req, res) {
    const { productoID } = req.params;
    try {
      const queryEliminar = 'DELETE FROM productos WHERE id  = ?';
      const fueEliminado = await BD.awaitQuery(queryEliminar, [productoID]);
      if (!fueEliminado.affectedRows) {
        return res.status(400).json('El producto no fue eliminado.');
      }
      res.status(200).json('Producto eliminado correctamente.');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async actualizarProduto(req, res) {
    const { productoID } = req.params;
    let { nombre, descripcion, marca, precio, id_categoria } = req.body;
    if (!nombre || !descripcion || !marca || !precio || !id_categoria) {
      return res.status(400).json('Todos los campos son obligatorios.');
    }
    if (isNaN(precio)) {
      return res.status(400).json('El precio debe ser un número.');
    }
    precio = Number(precio);
    try {
      const queryCategoria = 'SELECT id from categorias WHERE nombre = ?';
      const resultadoCategoria = await BD.awaitQuery(queryCategoria, [
        id_categoria,
      ]);
      if (!resultadoCategoria.length) {
        return res
          .status(404)
          .json('No existe una categoria con el nombre enviado.');
      }
      const queryActualizar =
        'UPDATE productos SET nombre = ?, descripcion = ? , marca = ?, id_categoria = ?, precio = ? WHERE id = ?';
      const fueActualizado = await BD.awaitQuery(queryActualizar, [
        nombre,
        descripcion,
        marca,
        resultadoCategoria[0].id,
        precio,
        productoID,
      ]);
      if (!fueActualizado.changedRows) {
        return res.status(400).json('El producto no fue actualizado.');
      }
      res.status(200).json('Producto fue actualizado correctamente.');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async obtenerProductoCategoria(req, res) {
    const { nombreCategoria } = req.params;
    if (!nombreCategoria) {
      return res.status(400).json('La categoria es obligatoria.');
    }
    try {
      const queryCategoria = 'SELECT * FROM categorias WHERE nombre = ?';
      const [categoria] = await BD.awaitQuery(queryCategoria, [
        nombreCategoria,
      ]);
      if (!categoria) {
        return res.status(404).json('Este categoria no existe.');
      }
      const queryProductoCategoria =
        'SELECT * FROM productos WHERE id_categoria = ?';
      const productos = await BD.awaitQuery(queryProductoCategoria, [
        categoria.id,
      ]);
      const productosPorCategoria = await Promise.all(
        productos.map(async (producto) => {
          const { id, nombre, descripcion, marca, precio } = producto;
          return {
            id,
            nombre,
            descripcion,
            marca,
            precio,
            id_categoria: categoria.nombre,
          };
        })
      );
      if (!productosPorCategoria.length) {
        return res
          .status(400)
          .json(
            'No se han encontrado productos basado en la categoria enviada.'
          );
      }
      res.status(200).json(productosPorCategoria);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
module.exports = ControladorAlmacen;
