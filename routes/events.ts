/**
 * Rutas de Events
 * host + /api/events
 */

import { Router } from 'express';
import { check } from 'express-validator';

import { validarJWT } from '../middlewares/validar-jwt';
import { validarCampos } from '../middlewares/validar-campos';
import { existeEventoPorId, mismoUsuario } from '../helpers/db-validators';
import { isDate } from '../helpers/term-validators';

import { getEventos, 
         crearEvento, 
         actualizarEvento, 
         eliminarEvento } from '../controllers/events';

const router = Router();
         
// Todas las rutas deben pasar por validarJWt
router.use(validarJWT);

// Obtener eventos
router.get('/', [
], getEventos);

// Crear evento
router.post('/', [
    check('title', 'El titulo es obligatorio').notEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),
    check('end', 'La fecha de fin es obligatoria').custom(isDate),
    validarCampos
], crearEvento);

// Actualizar evento
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeEventoPorId),
    check('id').custom((id, { req }) => mismoUsuario(id, req)),
    check('title', 'El titulo es obligatorio').notEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),
    check('end', 'La fecha de fin es obligatoria').custom(isDate),
    validarCampos
], actualizarEvento);

// Eliminar evento
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeEventoPorId),
    check('id').custom((id, { req }) => mismoUsuario(id, req)),
    validarCampos
], eliminarEvento);


export default router;