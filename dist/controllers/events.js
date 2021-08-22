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
exports.eliminarEvento = exports.actualizarEvento = exports.crearEvento = exports.getEventos = void 0;
const events_1 = __importDefault(require("../models/events"));
const getEventos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [total, eventos] = yield Promise.all([
        events_1.default.countDocuments(),
        events_1.default.find().populate('user', 'nombre')
    ]);
    return res.json({
        ok: true,
        total,
        eventos
    });
});
exports.getEventos = getEventos;
const crearEvento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, notes, end, start } = req.body;
    const data = {
        title,
        notes,
        end,
        start,
        user: req.usuario.id
    };
    const evento = new events_1.default(data);
    yield evento.save();
    return res.json({
        ok: true,
        evento
    });
});
exports.crearEvento = crearEvento;
const actualizarEvento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, notes, end, start } = req.body;
    const data = {
        title,
        notes,
        end,
        start,
        user: req.usuario.id
    };
    const evento = yield events_1.default.findByIdAndUpdate(id, data, { new: true });
    return res.json({
        ok: true,
        evento
    });
});
exports.actualizarEvento = actualizarEvento;
const eliminarEvento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const evento = yield events_1.default.findByIdAndRemove(id);
    return res.json({
        ok: true,
        evento
    });
});
exports.eliminarEvento = eliminarEvento;
//# sourceMappingURL=events.js.map