const { app } = require('./app');
const conexion = require('./config/conexion');
const puerto = 3000;
app.listen(puerto, async () => {
  console.log('Servidor en el puerto', puerto);
  try {
    await conexion.awaitConnect();
    console.log('Base de datos conectada');
  } catch (error) {
    console.log('error', error.message);
  }
});
