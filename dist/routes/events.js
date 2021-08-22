"use strict";
/**
 * Rutas de Events
 * host + /api/events
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const validar_campos_1 = require("../middlewares/validar-campos");
const db_validators_1 = require("../helpers/db-validators");
const events_1 = require("../controllers/events");
const router = express_1.Router();
// Todas las rutas deben pasar por validarJWt
router.use(validar_jwt_1.validarJWT);
// Obtener eventos
router.get('/', [], events_1.getEventos);
// Crear evento
router.post('/', [
    express_validator_1.check('title', 'El titulo es obligatorio').notEmpty(),
    express_validator_1.check('start', 'La fecha de inicio es obligatoria').isDate(),
    express_validator_1.check('end', 'La fecha de fin es obligatoria').isDate(),
    validar_campos_1.validarCampos
], events_1.crearEvento);
// Actualizar evento
router.put('/:id', [
    express_validator_1.check('id', 'No es un ID válido').isMongoId(),
    express_validator_1.check('id').custom(db_validators_1.existeEventoPorId),
    express_validator_1.check('id').custom((id, { req }) => db_validators_1.mismoUsuario(id, req)),
    express_validator_1.check('title', 'El titulo es obligatorio').notEmpty(),
    express_validator_1.check('start', 'La fecha de inicio es obligatoria').isDate(),
    express_validator_1.check('end', 'La fecha de fin es obligatoria').isDate(),
    validar_campos_1.validarCampos
], events_1.actualizarEvento);
// Eliminar evento
router.delete('/:id', [
    validar_jwt_1.validarJWT,
    express_validator_1.check('id', 'No es un ID válido').isMongoId(),
    express_validator_1.check('id').custom(db_validators_1.existeEventoPorId),
    express_validator_1.check('id').custom((id, { req }) => db_validators_1.mismoUsuario(id, req)),
    validar_campos_1.validarCampos
], events_1.eliminarEvento);
exports.default = router;
//# sourceMappingURL=events.js.map