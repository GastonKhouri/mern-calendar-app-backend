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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_1 = __importDefault(require("../models/usuario"));
// Controlador de la obtención de usuarios
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { estado: true };
    const [total, usuarios] = yield Promise.all([
        usuario_1.default.countDocuments(query),
        usuario_1.default.find(query)
    ]);
    return res.json({
        ok: true,
        total,
        usuarios
    });
});
exports.getUsuarios = getUsuarios;
// Controlador de la obtención de usuario por ID
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findById(id);
    return res.json(usuario);
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, correo, role, password } = req.body;
    // Generar la data a guardar
    const data = {
        nombre,
        correo,
        password,
        role
    };
    const usuario = new usuario_1.default(data);
    // Encriptar la contraseña
    const salt = bcryptjs_1.default.genSaltSync();
    usuario.password = bcryptjs_1.default.hashSync(password, salt);
    // Guardar en DB
    yield usuario.save();
    return res.json({
        ok: true,
        usuario
    });
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const _a = req.body, { _id, password, estado } = _a, resto = __rest(_a, ["_id", "password", "estado"]);
    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs_1.default.genSaltSync();
        resto.password = bcryptjs_1.default.hashSync(password, salt);
    }
    const usuario = yield usuario_1.default.findByIdAndUpdate(id, resto, { new: true });
    return res.json({
        ok: true,
        usuario
    });
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Borramos logicamente al usuario
    const usuario = yield usuario_1.default.findByIdAndUpdate(id, { estado: false }, { new: true });
    return res.json({
        ok: true,
        usuario
    });
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.js.map