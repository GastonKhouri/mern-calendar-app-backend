export interface UserModel {
    nombre: string;
    correo: string;
    password: string;
    role: string;
    estado: boolean;
    id?: string;
    uid?: string;
}

export interface RoleModel {
    role: string
}

export interface EventModel {
    title: string;
    notes: string;
    start: Date;
    end: Date;
    user: string;
}

export interface UserPayload {
    uid: string;
}

export interface JwtExpPayload {
    expiresIn: string;
    exp: number;
}