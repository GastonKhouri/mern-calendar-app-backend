"use strict";
/**
 * Rutas de Usuarios
 * host + /api/usuarios
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_roles_1 = require("../middlewares/validar-roles");
const db_validators_1 = require("../helpers/db-validators");
const usuarios_1 = require("../controllers/usuarios");
const router = express_1.Router();
router.get('/', [
    validar_jwt_1.validarJWT
], usuarios_1.getUsuarios);
router.get('/:id', [
    validar_jwt_1.validarJWT,
    express_validator_1.check('id', 'No es un ID válido').isMongoId(),
    express_validator_1.check('id').custom(db_validators_1.existeUsuarioPorId),
    validar_campos_1.validarCampos
], usuarios_1.getUsuario);
router.post('/', [
    // validarJWT,
    express_validator_1.check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    express_validator_1.check('password', 'El password debe de tener más de 6 letras').isLength({ min: 6 }),
    express_validator_1.check('correo', 'El correo no es válido').isEmail(),
    express_validator_1.check('correo').custom(db_validators_1.emailExiste),
    express_validator_1.check('role').custom(db_validators_1.esRoleValido),
    validar_campos_1.validarCampos
], usuarios_1.postUsuario);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    express_validator_1.check('id', 'No es un ID válido').isMongoId(),
    express_validator_1.check('id').custom(db_validators_1.existeUsuarioPorId),
    express_validator_1.check('role').custom(db_validators_1.esRoleValido),
    validar_campos_1.validarCampos
], usuarios_1.putUsuario);
router.delete('/:id', [
    validar_jwt_1.validarJWT,
    validar_roles_1.esAdminRole,
    express_validator_1.check('id', 'No es un ID válido').isMongoId(),
    express_validator_1.check('id').custom(db_validators_1.existeUsuarioPorId),
    validar_campos_1.validarCampos
], usuarios_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=usuarios.js.map