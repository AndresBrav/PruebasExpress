import express from 'express'

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Bienvenido a la pagina de libros ")
})

// Ruta específica con parámetro :nombre
router.get('/:nombre', (req, res) => {
    const { nombre } = req.params;
    res.send(`El nombre del libro es  ${nombre}`);
});

router.get('/:nombres/:autor/:anioEdicion', (req, res) => {
    console.log(req.params);
    const { nombres, autor, anioEdicion } = req.params;
    res.send(`El libro "${anioEdicion}" fue escrito por ${autor} y publicado en el año ${anioEdicion}.`);
});


// Ruta para agregar un nuevo libro
router.post('/', (req, res) => {
    const { titulo, autor } = req.body;

    if (!titulo || !autor) {
        return res.status(400).send("Faltan datos: título y autor son requeridos");
    }

    res.send(`Libro "${titulo}" de ${autor} agregado correctamente.`);
});

router.post('/agregar', (req, res) => {
    const { titulo, autor } = req.body;
    console.log(req.body);
    res.send(`se agrego con el autor ${autor} y el titulo ${titulo}`);
})

export default router;