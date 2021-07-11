const { Router } = require('express');
const Controlador = require('../controller/almacen.controller');
const ctrl = new Controlador();
const router = Router();
router.get('/productos', ctrl.obtenerProductos);
router.post('/productos', ctrl.crearProducto);
router.get(
  '/producto-categoria/:nombreCategoria',
  ctrl.obtenerProductoCategoria
);
router.get('/producto/:productoID', ctrl.obtenerProducto);
router.put('/producto/:productoID', ctrl.actualizarProduto);
router.delete('/producto/:productoID', ctrl.eliminarProducto);
module.exports = router;
