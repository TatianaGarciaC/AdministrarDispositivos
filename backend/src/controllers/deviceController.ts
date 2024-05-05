import { FastifyRequest, FastifyReply } from 'fastify';
import Device, { IDevice } from '../models/device';

export const createDevice = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
        const { name, model, storage, encryptedPassword }: IDevice = request.body as IDevice;
        const device: IDevice = new Device({ name, model, storage, encryptedPassword });
        await device.save();
        reply.code(201).send(device);
    } catch (error) {
        reply.code(500).send({ message: 'Error creating device', error });
    }
};

export const getDevices = async (_: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
        const devices: IDevice[] = await Device.find();
        reply.code(200).send(devices);
    } catch (error) {
        reply.code(500).send({ message: 'Error retrieving devices', error });
    }
};

export const getDeviceById = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<void> => {
    try {
        const id: string = request.params.id;
        const device: IDevice | null = await Device.findById(id);
        if (!device) {
            reply.code(404).send({ message: 'Device not found' });
            return;
        }
        reply.code(200).send(device);
    } catch (error) {
        reply.code(500).send({ message: 'Error retrieving device', error });
    }
};

export const updateDeviceById = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<void> => {
    try {
        const id: string = request.params.id;
        const { name, model, storage, encryptedPassword }: IDevice = request.body as IDevice;
        const updatedDevice: IDevice | null = await Device.findByIdAndUpdate(id, { name, model, storage, encryptedPassword }, { new: true });
        if (!updatedDevice) {
            reply.code(404).send({ message: 'Device not found' });
            return;
        }
        reply.code(200).send(updatedDevice);
    } catch (error) {
        reply.code(500).send({ message: 'Error updating device', error });
    }
};

export const deleteDeviceById = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<void> => {
    try {
        const id: string = request.params.id;
        const deletedDevice: IDevice | null = await Device.findByIdAndDelete(id);
        if (!deletedDevice) {
            reply.code(404).send({ message: 'Device not found' });
            return;
        }
        reply.code(204).send();
    } catch (error) {
        reply.code(500).send({ message: 'Error deleting device', error });
    }
};
