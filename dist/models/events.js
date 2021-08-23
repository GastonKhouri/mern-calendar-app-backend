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
const EventoSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'El titulo es obligatorio']
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: [true, 'La fecha de inicio es obligatoria']
    },
    end: {
        type: Date,
        required: [true, 'La fecha de fin es obligatoria']
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario es obligatorio']
    }
});
EventoSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, _id } = _a, data = __rest(_a, ["__v", "_id"]);
    data.id = _id;
    return data;
};
const Evento = mongoose_1.model('Evento', EventoSchema);
exports.default = Evento;
//# sourceMappingURL=events.js.map