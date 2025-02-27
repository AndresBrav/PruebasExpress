// const express = require('express')
import express from 'express'

const app = express()

// Middleware para interpretar JSON en las peticiones
app.use(express.json())

// Ruta GET: Responde con un mensaje de bienvenida
app.get('/', (req, res) => {
    res.send('¡Bienvenido a mi API!')
})

// Ruta GET con parámetro en la URL
app.get('/saludo/:nombre', (req, res) => {
    const nombre = req.params.nombre // Obtiene el parámetro de la URL
    res.send(`¡Hola, ${nombre}!`)
})

// Ruta POST: Recibe datos del cuerpo de la petición
app.post('/mensaje', (req, res) => {
    const { texto } = req.body // Extrae el campo "texto" del cuerpo
    if (!texto) {
        return res.status(400).json({ error: 'El campo "texto" es obligatorio' })
    }
    res.json({ mensaje: `Has enviado: ${texto}` })
})

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000')
})
