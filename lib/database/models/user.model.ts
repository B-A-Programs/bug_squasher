import { Schema, model, models } from "mongoose";

export interface IUser extends Document {
    _id: string;
    clerkId: string;
    firstName: string;
    lastName: string;
    isStaff: boolean;
}


const UserSchema = new Schema({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    isStaff: { type: Boolean, required: true, default: false },
})

const User = models.User || model('User', UserSchema)

export default User;