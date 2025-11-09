"# Proyecto Usuarios" 
Proyecto Usuarios — PretoAm
1. Estructura General del Sistema
El sistema está construido utilizando React como framework de interfaz y Node.js con Express para el backend.
Su propósito es proporcionar un panel administrativo para la gestión de usuarios, implementando las operaciones CRUD (Crear, Leer, Actualizar y Eliminar).
La comunicación entre frontend y backend se realiza mediante solicitudes HTTP utilizando la librería Axios, mientras que la persistencia de datos se maneja en una base de datos MySQL.
La aplicación se divide en dos partes principales:
Frontend: interfaz de usuario y componentes React.
Backend: API REST desarrollada en Node.js con Express.

2. Backend — API REST

El backend tiene como objetivo procesar las solicitudes enviadas desde el frontend y comunicarse con la base de datos.
Está compuesto por los siguientes elementos:

a) Configuración de base de datos (database.js)
Se establece la conexión con MySQL utilizando la librería mysql2.
Se definen los parámetros de conexión (host, usuario, contraseña y nombre de base de datos).
El archivo exporta la conexión para ser utilizada en las rutas.

b) Rutas principales (usuarios.js)
Contiene todas las operaciones relacionadas con la tabla usuarios y el inicio de sesión:
GET / → Obtiene todos los usuarios registrados.
POST /add → Inserta un nuevo usuario con nombre, email y teléfono.
PUT /update/:id → Actualiza los datos de un usuario existente.
DELETE /delete/:id → Elimina un usuario de la base de datos.
POST /login → Verifica credenciales de acceso para el panel administrativo.
Cada operación está protegida con validaciones básicas y manejo de errores, retornando respuestas JSON al frontend.

3. Frontend — React
El frontend proporciona la interfaz visual para la administración de usuarios. Está construido con componentes reutilizables que interactúan con el backend mediante Axios.

a) Componente App.js
Es el punto de entrada principal de la aplicación.
Sus responsabilidades son:
Mantener el estado del usuario autenticado (almacenado en localStorage).
Renderizar dinámicamente:
Pantalla de Login si no existe sesión activa.
Panel Administrativo si el usuario ya inició sesión.
Gestionar el cierre de sesión y la actualización de la interfaz.

b) Componente Login.js
Maneja el proceso de autenticación.
Captura las credenciales del usuario.
Envía una solicitud POST al backend (/api/usuarios/login).
Si las credenciales son correctas, almacena la sesión en localStorage.
Si no, muestra un mensaje de error.

c) Componente AddUser.js
Permite registrar nuevos usuarios en el sistema.
Utiliza un formulario controlado que sincroniza los valores con el estado interno del componente.
Envía los datos mediante POST al backend.
Al completar el registro, solicita la actualización de la lista de usuarios en pantalla.

d) Componente ListaUsuarios.js
Encargado de mostrar el listado completo de usuarios.
Utiliza useEffect para ejecutar una solicitud GET al cargar el componente.
Recibe funciones para editar o eliminar registros.
Actualiza la vista cuando se detectan cambios.

e) Componente UsersTable.js
Separa la presentación de la lista de usuarios en forma de tabla para mantener una arquitectura modular.
Renderiza dinámicamente las filas y columnas.
Cada fila incluye botones de acción Editar y Eliminar.

f) Componente UserForm.js
Gestiona la actualización de usuarios existentes.
Carga los datos iniciales del usuario recibido por props.
Permite modificar nombre, email o teléfono.
Envía los cambios mediante una solicitud PUT al backend y actualiza el estado global.

4. Recursos y Estilos
El proyecto utiliza estilos CSS básicos integrados en los componentes.
La estructura está diseñada para permitir la incorporación de frameworks de diseño como TailwindCSS o Bootstrap en futuras versiones.
Se incluye un logotipo institucional (archivo PNG) que refuerza la identidad visual del sistema.

5. Funcionamiento General del Sistema
El usuario accede a la aplicación e ingresa sus credenciales.
Si el login es exitoso, se muestra el panel administrativo.
Desde el panel, el administrador puede:
Visualizar todos los usuarios.
Registrar nuevos.
Editar información existente.
Eliminar usuarios.
Todas las acciones se reflejan en tiempo real en la base de datos MySQL.

6. Conclusión Técnica
El sistema implementa una arquitectura modular y escalable, basada en componentes desacoplados que favorecen el mantenimiento.
El flujo de datos unidireccional garantiza la trazabilidad y control del estado global.
El uso combinado de React, Express y MySQL permite una integración eficiente entre la interfaz y la persistencia de datos.
Este documento describe de manera formal los elementos estructurales y funcionales que conforman la aplicación, facilitando su comprensión técnica y su futura extensión.

