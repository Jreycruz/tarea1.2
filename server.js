import express, { json } from 'express';
import tareasRouter from './routes/tareas.js';

const app = express();
app.disable('x-powered-by');
app.use(json());

app.use('/tareas', tareasRouter);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Recurso no encontrado'
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
