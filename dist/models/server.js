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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("../database/config");
const usuarios_1 = __importDefault(require("../routes/usuarios"));
const auth_1 = __importDefault(require("../routes/auth"));
const events_1 = __importDefault(require("../routes/events"));
class Server {
    constructor() {
        this.paths = {
            auth: '/api/auth',
            events: '/api/events',
            usuarios: '/api/usuarios',
        };
        this.app = express_1.default();
        this.port = process.env.PORT || '8080';
        // Conectar a base de datos
        this.conectarDB();
        // Middlewares
        this.middlewares();
        // Rutas de la app
        this.routes();
    }
    middlewares() {
        // CORS
        this.app.use(cors_1.default());
        // Lectura y parseo del body
        this.app.use(express_1.default.json());
        // Directorio publico
        this.app.use(express_1.default.static('public'));
    }
    conectarDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield config_1.dbConnection();
        });
    }
    routes() {
        this.app.use(this.paths.auth, auth_1.default);
        this.app.use(this.paths.events, events_1.default);
        this.app.use(this.paths.usuarios, usuarios_1.default);
        // this.app.get('*', (req, res) => {
        //     res.sendFile(path.resolve(__dirname, '../public/index.html'));
        // });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map