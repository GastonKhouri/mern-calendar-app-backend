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
exports.mismoUsuario = exports.existeEventoPorId = exports.existeUsuarioPorId = exports.emailExiste = exports.esRoleValido = void 0;
const role_1 = __importDefault(require("../models/role"));
const usuario_1 = __importDefault(require("../models/usuario"));
const events_1 = __importDefault(require("../models/events"));
// Verificar que el rol es válido
const esRoleValido = (role = '') => __awaiter(void 0, void 0, void 0, function* () {
    // Verificar si el rol es existe en la DB
    const existeRol = yield role_1.default.findOne({ role });
    if (!existeRol) {
        throw new Error(`El rol ${role} no está registrado en la DB`);
    }
});
exports.esRoleValido = esRoleValido;
// Verificar que exista un correo en la BD
const emailExiste = (correo = '') => __awaiter(void 0, void 0, void 0, function* () {
    // Verificar si el correo existe en la DB
    const existeEmail = yield usuario_1.default.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya está registrado`);
    }
});
exports.emailExiste = emailExiste;
// Verificar que exista un usuario dado un ID en la DB
const existeUsuarioPorId = (id = '') => __awaiter(void 0, void 0, void 0, function* () {
    // Verificar si el id existe en la DB
    const existeUsuario = yield usuario_1.default.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id ${id} no existe`);
    }
});
exports.existeUsuarioPorId = existeUsuarioPorId;
// Verificar que exista un evento dado un ID en la DB
const existeEventoPorId = (id = '') => __awaiter(void 0, void 0, void 0, function* () {
    // Verificar si el id existe en la DB
    const existeEvento = yield events_1.default.findById(id);
    if (!existeEvento) {
        throw new Error(`El id ${id} no existe`);
    }
});
exports.existeEventoPorId = existeEventoPorId;
// Verificar que exista un evento dado un ID en la DB
const mismoUsuario = (id = '', req) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.usuario.id;
    // Verificar si el id existe en la DB
    const evento = yield events_1.default.findById(id);
    if ((evento === null || evento === void 0 ? void 0 : evento.user.toString()) !== uid) {
        throw new Error(`No tiene privilegios para modificar este evento`);
    }
});
exports.mismoUsuario = mismoUsuario;
//# sourceMappingURL=db-validators.js.map