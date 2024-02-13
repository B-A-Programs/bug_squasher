import { Document, Schema, model, models } from "mongoose";

export interface IBug extends Document {
    _id: string;
    title: string;
    description: string;
    stepsToReproduce: string;
    createdAt: Date;
    resolvedAt: Date;
    status: string;
    reporter: { _id: string; firstName: string; lastName: string};
    resolver: { _id: string; firstName: string; lastName: string};
}

const BugSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    stepsToReproduce: { type: String },
    status: { "type": String, "enum": ['Pending', 'In Progress', 'Resolved'], required: true, default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
    resolvedAt: { type: Date },
    reporter: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    resolver: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Bug = models.Bug || model('Bug', BugSchema);

export default Bug;