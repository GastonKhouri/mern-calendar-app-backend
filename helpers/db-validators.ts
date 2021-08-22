import Role from '../models/role';
import Usuario from '../models/usuario';
import Evento from '../models/events';
import { Request } from 'express';

// Verificar que el rol es válido
export const esRoleValido = async(role = '') => {

    // Verificar si el rol es existe en la DB
    const existeRol = await Role.findOne({ role });

    if (!existeRol) {
        throw new Error(`El rol ${ role } no está registrado en la DB`);
    }
}

// Verificar que exista un correo en la BD
export const emailExiste = async(correo = '') => {

    // Verificar si el correo existe en la DB
    const existeEmail = await Usuario.findOne({ correo });

    if (existeEmail) {
        throw new Error(`El correo ${ correo } ya está registrado`);
    }

}

// Verificar que exista un usuario dado un ID en la DB
export const existeUsuarioPorId = async(id = '') => {

    // Verificar si el id existe en la DB
    const existeUsuario = await Usuario.findById(id);

    if (!existeUsuario) {
        throw new Error(`El id ${ id } no existe`);
    }

}

// Verificar que exista un evento dado un ID en la DB
export const existeEventoPorId = async(id = '') => {

    // Verificar si el id existe en la DB
    const existeEvento = await Evento.findById(id);

    if (!existeEvento) {
        throw new Error(`El id ${ id } no existe`);
    }

}

// Verificar que exista un evento dado un ID en la DB
export const mismoUsuario = async(id = '', req:any) => {

    const uid = req.usuario.id;

    // Verificar si el id existe en la DB
    const evento = await Evento.findById(id);

    if (evento?.user.toString() !== uid) {
        throw new Error(`No tiene privilegios para modificar este evento`);
    }

}