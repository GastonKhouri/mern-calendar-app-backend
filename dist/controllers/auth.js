"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.revalidarToken = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generar_jwt_1 = require("../helpers/generar-jwt");
const usuario_1 = __importDefault(require("../models/usuario"));
// Controlador del login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, password } = req.body;
    try {
        // Verificar si el correo existe
        const usuario = yield usuario_1.default.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'El Correo / Password no son correctos - correo'
            });
        }
        // Verificar si el usuario está activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'El Correo / Password no son correctos - estado: false'
            });
        }
        // Verificar contraseña
        const validPassword = bcryptjs_1.default.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'El Correo / Password no son correctos - password'
            });
        }
        // Generar JWt
        const token = yield generar_jwt_1.generarJWT(usuario.id);
        return res.json({
            ok: true,
            usuario,
            token
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.login = login;
// Controlador de la renovación del token
const revalidarToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = req.usuario;
    const token = yield generar_jwt_1.generarJWT(usuario.id);
    return res.json({
        ok: true,
        usuario,
        token
    });
});
exports.revalidarToken = revalidarToken;
//# sourceMappingURL=auth.js.map