-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 09-07-2021 a las 21:41:53
-- Versión del servidor: 5.7.31.1
-- Versión de PHP: 7.2.24.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `actividad-3.2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`) VALUES
(2, 'Discos Duro'),
(1, 'Memorias RAM'),
(5, 'Monitor'),
(7, 'Mouse'),
(3, 'Placas Madre'),
(4, 'Tarjetas Video'),
(6, 'Teclados');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `descripcion` text NOT NULL,
  `marca` varchar(30) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `precio` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `marca`, `id_categoria`, `precio`) VALUES
(18, 'Memoria RAM DDR4', 'Memoria RAM de 4GB ideal para tareas ', 'Nvidia', 1, 30),
(20, 'Disco SDD 180GB', 'Disco en estado solido de 180GB USB tipo C', 'Kingstong', 2, 50),
(21, 'Teclado Gamer', 'Teclado Mecanico con LEDS RGB', 'Sony', 6, 25),
(22, 'Mouse inalambrico', 'Mouse inalambrico con alfombrilla y luces LED RGB ideal para gamers!', 'Logitech', 7, 45),
(23, 'Asus Rog Strix Z490-I Gaming', 'Asus ROG STRIX Z490-I GAMING, Chipset Intel Z490, Soporta: Intel para 10a gen ,Core , Pentium Gold y Celeron. Socket 1200, Memoria: DDR4 ', 'Asus', 3, 300),
(25, 'Asus ROG Swift PG35VQ', 'es un monitor gaming ultrawide, contando con una pantalla curva, con un tamaño en diagonal de 35”. El panel es del tipo VA con resolución máxima de 3440 x 1440', 'Asus', 5, 2099),
(26, 'kingston predator ddr4 3200', 'Predator DDR4 ofrece velocidades de vértigo de hasta 3333 MHz junto con bajas latencias de CL15–CL16 para un rendimiento DDR4 extremo', 'Kingston', 1, 190),
(27, 'MSI GeForce RTX 3090 SUPRIM X 24G', 'La tarjeta gráfica MSI GeForce RTX 3090 SUPRIM X 24G cuenta con 24 GB de memoria de vídeo GDDR6X de última generación. La tarjeta gráfica RTX 3090 SUPRIM X 24G se caracteriza por una alta velocidad de cuadro y una mejor refrigeración para una fiabilidad y rendimiento a largo plazo.', 'MSI MSI', 4, 2200);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(40) NOT NULL,
  `clave` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `clave`) VALUES
(1, 'admin', '123456');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
