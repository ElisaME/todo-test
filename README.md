# Prueba Técnica Frontend Sr.

## 🚀 Instalación

1. Clona el repositorio

   ```sh
   git clone https://github.com/ElisaME/todo-test.git
   ```

2. Instala los paquetes de NPM

   ```sh
   npm install
   ```

3. Ejecuta el proyecto

   ```sh
   npm run dev
   ```

## Descripción de la prueba:

Para la prueba técnica, se deberá crear un sistema de tareas. Este sistema deberá
permitirte crear nuevas tareas, actualizarlas y consultarlas.

### Las categorías iniciales deberán ser:

- Trabajo
- Estudio
- Casa
- Familia
- Diversión

### Funcionalidades obligatorias son:

- Consultar tareas pendientes / finalizadas (listas sólo las 6 últimas y deberán
  verse en su respectivo apartado)

- Crear tareas, cuando se cree una tarea se deberá asignar un color aleatorio
  que no se repita
- Actualizar estado de tarea a tarea finalizada, una vez que se finalice la tarea deberá dejar de verse en pendientes y se verá en finalizadas

### Funcionalidades extras:

- [x] Paginador de tareas
- [x] Eliminar Tareas
- [x] Crear categorías
- Login (iniciar sesión/cerrar sesión)

El frontend deberá ser trabajado con ReactJs, puedes utilizar las librerías y los
hooks que quieras, busca optimizar el rendimiento de la aplicación.
La data que consumirás deberá venir de un Json, que se deberá guardar en
storage, actualizarse y consumirse desde ahí.
El tiempo estimado para esta prueba en de 2-3 días, una vez que lo tengas
terminado deberás compartir el repositorio de github, en el readMe deberás poner
las instrucciones para poder correr el proyecto en local.
