"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UsuarioSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio'],
        enum: ['ADMIN_ROLE', 'TEACHER_ROLE', 'STUDENT_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    }
});
UsuarioSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, _id, password } = _a, usuario = __rest(_a, ["__v", "_id", "password"]);
    usuario.uid = _id;
    return usuario;
};
const Usuario = mongoose_1.model('Usuario', UsuarioSchema);
exports.default = Usuario;
//# sourceMappingURL=roles.js.map