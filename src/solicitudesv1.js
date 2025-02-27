// const express = require('express')
import express from 'express'
import RutasLibros from './routes/libros.js'
import fs from 'fs'

const app = express();

// Middleware para interpretar JSON en las peticiones
app.use(express.json())

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

// (() => {
//     let id = 1; // Aquí puedes definir el id o pasarlo dinámicamente
//     let usuario = usuarios.find(i => i.id === id);
//     console.log(usuario);
// })()



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





// rutas de los libros ...........................
app.use('/libros', RutasLibros);


app.get('/', (req, res) => {
    res.send('welcome to my API');
})

// Ruta GET con parámetro en la URL
app.get('/saludar-usuario/:usuario', (req, res) => {
    const { usuario } = req.params // Obtiene el parámetro de la URL
    res.send(`¡Hola, ${usuario}!`)
})

app.get('/equipoFutbol/:equipo', (req, res) => {
    const { equipo } = req.params
    res.send(`Tu equipo favorito es: ${equipo}`)
})


// Ruta POST: Recibe datos del cuerpo de la petición
app.post('/mensaje', (req, res) => {
    const { texto } = req.body // Extrae el campo "texto" del cuerpo
    if (!texto) {
        return res.status(400).json({ error: 'El campo "texto" es obligatorio' })
    }
    res.json({ mensaje: `Has enviado: ${texto}` })
})

app.listen(3000, () => {
    console.log("servidor corriendo en localhost");
})