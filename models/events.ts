import { Schema, model } from 'mongoose';
import { EventModel } from '../interfaces/interfaces';

const EventoSchema = new Schema<EventModel>({
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
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario es obligatorio']
    }
});

EventoSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject();
    return data;
}

const Evento = model<EventModel>('Evento', EventoSchema); 

export default Evento;