import express from 'express'
const routerBasic = express.Router();

routerBasic.get('/', (req, res) => {
    res.send('welcome to my API');
})

// Ruta GET con parámetro en la URL
routerBasic.get('/saludar-usuario/:usuario', (req, res) => {
    const { usuario } = req.params // Obtiene el parámetro de la URL
    res.send(`¡Hola, ${usuario}!`)
})

routerBasic.get('/equipoFutbol/:equipo', (req, res) => {
    const { equipo } = req.params
    res.send(`Tu equipo favorito es: ${equipo}`)
})


// Ruta POST: Recibe datos del cuerpo de la petición
routerBasic.post('/mensaje', (req, res) => {
    const { texto } = req.body // Extrae el campo "texto" del cuerpo
    if (!texto) {
        return res.status(400).json({ error: 'El campo "texto" es obligatorio' })
    }
    res.json({ mensaje: `Has enviado: ${texto}` })
})


export default routerBasic

