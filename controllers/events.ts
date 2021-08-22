import { Request, Response } from "express"
import Evento from '../models/events';

export const getEventos = async(req: Request, res: Response) => {

    const [ total, eventos ] = await Promise.all([
        Evento.countDocuments(),
        Evento.find().populate('user', 'nombre')
    ]);

    return res.json({
        ok: true,
        total,
        eventos
    });
    
}


export const crearEvento = async(req: Request, res: Response) => {

    const { title, notes, end, start } = req.body;

    const data = {
        title,
        notes,
        end,
        start,
        user: req.usuario!.id
    }

    const evento = new Evento(data);

    await evento.save();

    return res.json({
        ok: true,
        evento
    });
    
}


export const actualizarEvento = async(req: Request, res: Response) => {

    const { id } = req.params;
    const { title, notes, end, start } = req.body;

    const data = {
        title,
        notes,
        end,
        start,
        user: req.usuario!.id
    }

    const evento = await Evento.findByIdAndUpdate(id, data, { new: true });

    return res.json({
        ok: true,
        evento
    });
    
}


export const eliminarEvento = async(req: Request, res: Response) => {

    const { id } = req.params;

    const evento = await Evento.findByIdAndRemove(id);

    return res.json({
        ok: true,
        evento
    });
    
}
