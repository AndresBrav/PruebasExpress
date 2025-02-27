// const express = require('express')
import express from 'express'
import RutasLibros from './routes/libros.js'
import RutasAutos from './routes/autos.js'
import RutasBasicas from './routes/comandosBasicos.js'

import fs from 'fs'

const app = express();

// Middleware para interpretar JSON en las peticiones
app.use(express.json())

// Middleware para verificar si el archivo 'usuarios.json' existe
const verificarArchivo = (req, res, next) => {
    const archivo = 'usuarios.json';
    if (!fs.existsSync(archivo)) {
        return res.status(500).json({ error: 'El archivo de usuarios no existe' });
    }
    next(); // Si el archivo existe, continuamos con la siguiente función (la ruta DELETE)
};

// Array de ejemplo con usuarios
// let usuarios = [
//     { id: 1, nombre: 'José' },
//     { id: 2, nombre: 'Ana' },
//     {id: 3,nombre:'Alex'}
// ];

// Función para leer usuarios desde el archivo
const leerUsuarios = () => {
    const data = fs.readFileSync('usuarios.json', 'utf8');
    //data trae todo el contenido de json
    // console.log(data);
    return JSON.parse(data);
};

// Función para escribir usuarios en el archivo
const guardarUsuarios = (usuarios) => {
    fs.writeFileSync('usuarios.json', JSON.stringify(usuarios, null, 2));
};

// Middleware para verificar si el archivo 'usuarios.json' existe
app.use(verificarArchivo); // Esto se ejecuta antes de las rutas

// Ruta GET para obtener todos los usuarios
app.get('/usuarios', (req, res) => {
    let usuarios = leerUsuarios(); // Leer usuarios actuales desde el archivo
    res.json(usuarios); // Devolver la lista de usuarios
});


// Ruta para actualizar un usuario con PUT
app.put('/usuarios/:id', (req, res) => {
    let usuarios = leerUsuarios(); // Leer usuarios actuales
    console.log(req.params);
    const id = parseInt(req.params.id);
    const datosActualizados = req.body;

    let usuario = usuarios.find(u => u.id === id);
    if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Actualizar usuario
    usuario.nombre = datosActualizados.nombre || usuario.nombre;

    // Guardar cambios en el archivo
    guardarUsuarios(usuarios);

    res.json({ mensaje: `Usuario ${id} actualizado`, usuario });
});


// Ruta para crear un nuevo usuario con POST
app.post('/usuarios', (req, res) => {
    let usuarios = leerUsuarios(); // Leer usuarios actuales
    const nuevoUsuario = req.body; // Datos del nuevo usuario desde el cuerpo de la petición

    // Asegurarnos de que el nombre esté presente en los datos
    if (!nuevoUsuario.nombre) {
        return res.status(400).json({ mensaje: 'El nombre del usuario es obligatorio' });
    }

    // Crear un nuevo id (el siguiente id disponible)
    const id = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
    const usuarioConId = { id, ...nuevoUsuario };

    // Agregar el nuevo usuario al arreglo de usuarios
    usuarios.push(usuarioConId);

    // Guardar los cambios en el archivo
    guardarUsuarios(usuarios);

    res.status(201).json({ mensaje: 'Usuario creado', usuario: usuarioConId });
});

// Ruta DELETE para eliminar un usuario
app.delete('/usuarios/:id', (req, res) => {
    let usuarios = leerUsuarios(); // Leer usuarios actuales desde el archivo
    const id = parseInt(req.params.id); // Obtener el ID del parámetro de la URL

    // Buscar el índice del usuario a eliminar
    const index = usuarios.findIndex(u => u.id === id);

    // Si el usuario no se encuentra, respondemos con un error 404
    if (index === -1) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Eliminar el usuario
    usuarios.splice(index, 1);

    // Guardar los cambios en el archivo
    guardarUsuarios(usuarios);

    // Responder con un mensaje de éxito
    res.json({ mensaje: `Usuario con ID ${id} eliminado` });
});

//rutas de los autos 
app.use('/autos',RutasAutos);

// rutas de los libros ...........................
app.use('/libros', RutasLibros);


//comandos basicos
app.use('/basic',RutasBasicas);

app.listen(3000, () => {
    console.log("servidor corriendo en localhost");
})