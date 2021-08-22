"use strict";
/**
 * Rutas de Auth
 * host + /api/auth
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const auth_1 = require("../controllers/auth");
const router = express_1.Router();
// Iniciar sesión
router.post('/login', [
    express_validator_1.check('correo', 'El correo es obligatorio').isEmail(),
    express_validator_1.check('password', 'La contraseña es obligatoria').notEmpty(),
    validar_campos_1.validarCampos
], auth_1.login);
// Renovar token
router.get('/renew', [
    validar_jwt_1.validarJWT
], auth_1.revalidarToken);
exports.default = router;
//# sourceMappingURL=auth.js.map