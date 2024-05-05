import mongoose, { Schema, Document } from 'mongoose';

export interface IDevice extends Document {
    name: string;
    model: string;
    storage: number;
    encryptedPassword: string;
}

const DeviceSchema: Schema = new Schema({
    name: { type: String, required: true },
    model: { type: String, required: true },
    storage: { type: Number, required: true },
    encryptedPassword: { type: String, required: true }
});

const Device = mongoose.model<IDevice>('Device', DeviceSchema);

export default Device;
