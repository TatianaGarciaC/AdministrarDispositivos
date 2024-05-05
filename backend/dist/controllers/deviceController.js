"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDeviceById = exports.updateDeviceById = exports.getDeviceById = exports.getDevices = exports.createDevice = void 0;
const device_1 = __importDefault(require("../models/device"));
const createDevice = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, model, storage, encryptedPassword } = request.body;
        const device = new device_1.default({ name, model, storage, encryptedPassword });
        yield device.save();
        reply.code(201).send(device);
    }
    catch (error) {
        reply.code(500).send({ message: 'Error creating device', error });
    }
});
exports.createDevice = createDevice;
const getDevices = (_, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const devices = yield device_1.default.find();
        reply.code(200).send(devices);
    }
    catch (error) {
        reply.code(500).send({ message: 'Error retrieving devices', error });
    }
});
exports.getDevices = getDevices;
const getDeviceById = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = request.params.id;
        const device = yield device_1.default.findById(id);
        if (!device) {
            reply.code(404).send({ message: 'Device not found' });
            return;
        }
        reply.code(200).send(device);
    }
    catch (error) {
        reply.code(500).send({ message: 'Error retrieving device', error });
    }
});
exports.getDeviceById = getDeviceById;
const updateDeviceById = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = request.params.id;
        const { name, model, storage, encryptedPassword } = request.body;
        const updatedDevice = yield device_1.default.findByIdAndUpdate(id, { name, model, storage, encryptedPassword }, { new: true });
        if (!updatedDevice) {
            reply.code(404).send({ message: 'Device not found' });
            return;
        }
        reply.code(200).send(updatedDevice);
    }
    catch (error) {
        reply.code(500).send({ message: 'Error updating device', error });
    }
});
exports.updateDeviceById = updateDeviceById;
const deleteDeviceById = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = request.params.id;
        const deletedDevice = yield device_1.default.findByIdAndDelete(id);
        if (!deletedDevice) {
            reply.code(404).send({ message: 'Device not found' });
            return;
        }
        reply.code(204).send();
    }
    catch (error) {
        reply.code(500).send({ message: 'Error deleting device', error });
    }
});
exports.deleteDeviceById = deleteDeviceById;
