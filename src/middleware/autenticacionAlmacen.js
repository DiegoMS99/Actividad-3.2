const BD = require('../config/conexion');
class Autenticacion {
  async verificarAdministrador(req, res, next) {
    try {
      const usuario = req.headers['usuario'];
      const clave = req.headers['clave'];
      if (!usuario || !clave) {
        return res
          .status(401)
          .json('Para acceder al almacen se necesita autenticación.');
      }
      const queryUsuario =
        'SELECT id FROM usuarios WHERE usuario = ? AND clave = ?';
      const esAdmin = await BD.awaitQuery(queryUsuario, [usuario, clave]);
      if (!esAdmin.length) {
        return res.status(403).json('El usuario o la clave son incorrectos.');
      }
      next();
    } catch (error) {
      res
        .status(401)
        .json('Ha ocurrido un error verificando la autenticación.');
    }
  }
}
module.exports = new Autenticacion();
