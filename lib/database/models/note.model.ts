import { Document, Schema, model, models } from "mongoose";

export interface INote extends Document {
    _id: string;
    text: string;
    author: { _id: string; firstName: string; lastName: string};
    bug: { _id: string }
}

const NoteSchema = new Schema({
    text: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    bug: { type: Schema.Types.ObjectId, ref: 'Bug' },
})

const Note = models.Note || model('Note', NoteSchema);

export default Note;