"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./models/server"));
const dotenv_1 = __importDefault(require("dotenv"));
// Configurar dotenv
dotenv_1.default.config();
// Crear instancia del servidor
const server = new server_1.default();
// Iniciar servidor
server.listen();
//# sourceMappingURL=app.js.map