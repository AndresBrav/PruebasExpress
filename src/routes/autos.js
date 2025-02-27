import express from 'express'
import fs from 'fs'

const rutasAutos = express.Router();

rutasAutos.get('/', (req, res) => {
    res.send('Hola bienvenido a la pagina de autos')
})

//verificarArchivo
const verificarArchivo = (req, res, next) => {
    const archivo = 'carros.json';
    if (!fs.existsSync(archivo)) {
        return res.status(500).json(
            { error: 'el archivo de usuarios no existe' }
        );
    }
    next(); /* continuamos la ejecucion  */
}


// Función para leer usuarios desde el archivo
const leerAutos = () => {
    const data = fs.readFileSync('carros.json', 'utf8');
    //data trae todo el contenido de json
    console.log(data);
    return JSON.parse(data);
};

// Función para escribir autos en el archivo
const guardarAutos = (autos) => {
    fs.writeFileSync('carros.json', JSON.stringify(autos, null, 2));
};

// Middleware para verificar si el archivo 'usuarios.json' existe
rutasAutos.use(verificarArchivo); // Esto se ejecuta antes de las rutas

rutasAutos.get('/obtener', (req, res) => {
    let autos = leerAutos();

    res.json(autos)
});

rutasAutos.post('añadir',(req,res) => {
    
})

export default rutasAutos;

