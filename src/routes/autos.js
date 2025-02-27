import express from 'express';
import fs from 'fs';

const rutasAutos = express.Router();

rutasAutos.get('/', (req, res) => {
    res.send('Hola bienvenido a la pagina de autos');
});

// Verificar si el archivo de autos existe
const verificarArchivo = (req, res, next) => {
    const archivo = 'carros.json';
    if (!fs.existsSync(archivo)) {
        return res.status(500).json({ error: 'El archivo de autos no existe' });
    }
    next(); // Continuamos con la ejecución
};

// Función para leer los autos desde el archivo
const leerAutos = () => {
    const data = fs.readFileSync('carros.json', 'utf8');
    // console.log(data);
    return JSON.parse(data);
};

const guardarAutos = (autos) => {
    console.log(autos);
    fs.writeFileSync('carros.json', JSON.stringify(autos, null, 2));
};

rutasAutos.use(verificarArchivo); // Esto se ejecuta antes de las rutas

// Ruta GET para obtener los autos
rutasAutos.get('/obtener', (req, res) => {
    let autos = leerAutos();
    res.json(autos);
});

rutasAutos.post('/aniadir', (req, res) => {
    let autos = leerAutos();
    const nuevoAuto = req.body;

    // autos.push(nuevoAuto)
    autos =[...autos,nuevoAuto]

    // Guardar los cambios en el archivo
    guardarAutos(autos);
    res.send(nuevoAuto)
});

export default rutasAutos