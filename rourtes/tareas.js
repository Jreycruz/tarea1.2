import { Router } from 'express';
import { randomUUID } from 'crypto';
import { validateTarea } from '../schemas/tarea.js';

const router = Router();
const tareas = []; 

router.get('/', (req, res) => {
    res.json({ success: true, data: tareas });
});

router.get('/:id', (req, res) => {
    const tarea = tareas.find(t => t.id === req.params.id);

    if (!tarea) {
        return res.status(404).json({ success: false, message: 'Tarea no encontrada' });
    }

    res.json({ success: true, data: tarea });
});

router.post('/', (req, res) => {
    const result = validateTarea(req.body);

    if (!result.success) {
        return res.status(400).json({
            success: false,
            errors: result.error.errors.map(err => ({ message: err.message, path: err.path[0] }))
        });
    }

    const nuevaTarea = { id: randomUUID(), fecha_creacion: new Date(), ...result.data };
    tareas.push(nuevaTarea);

    res.status(201).json({ success: true, data: nuevaTarea });
});

router.put('/:id', (req, res) => {
    const index = tareas.findIndex(t => t.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ success: false, message: 'Tarea no encontrada' });
    }

    const result = validateTarea(req.body);
    if (!result.success) {
        return res.status(400).json({
            success: false,
            errors: result.error.errors.map(err => ({ message: err.message, path: err.path[0] }))
        });
    }

    tareas[index] = { ...tareas[index], ...result.data };

    res.json({ success: true, data: tareas[index] });
});

router.delete('/:id', (req, res) => {
    const index = tareas.findIndex(t => t.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ success: false, message: 'Tarea no encontrada' });
    }

    tareas.splice(index, 1);
    res.json({ success: true, message: 'Tarea eliminada' });
});

export default router;
