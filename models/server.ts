import express, { Application } from 'express';
import path from 'path';
import cors from 'cors';

import { dbConnection } from '../database/config';

import userRoutes from '../routes/usuarios';
import authRoutes from '../routes/auth';
import eventsRoutes from '../routes/events';


class Server {

    private app: Application;
    private port: string;
    private paths = {
        auth:     '/api/auth',
        events:   '/api/events',
        usuarios: '/api/usuarios',
    }

    constructor() {

        this.app = express();
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
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public'));

    }

    async conectarDB() {
        await dbConnection();
    }

    routes() {

        this.app.use(this.paths.auth, authRoutes);
        this.app.use(this.paths.events, eventsRoutes);
        this.app.use(this.paths.usuarios, userRoutes);

        this.app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, '../public/index.html'));
        });

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }


}

export default Server;