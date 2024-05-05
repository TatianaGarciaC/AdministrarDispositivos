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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDeviceById = exports.updateDeviceById = exports.getDeviceById = exports.getDevices = exports.createDevice = void 0;
const createDevice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, model, storage, password } = req.body;
        const newDevice = new device_1.Device({ name, model, storage, password });
        yield newDevice.save();
        return res.status(201).json({ message: 'Device created successfully', device: newDevice });
    }
    catch (error) {
        return handleError(res, error);
    }
});
exports.createDevice = createDevice;
const getDevices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const devices = yield device_1.Device.find();
        return res.status(200).json(devices);
    }
    catch (error) {
        return handleError(res, error);
    }
});
exports.getDevices = getDevices;
const getDeviceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const device = yield device_1.Device.findById(id);
        if (!device) {
            return res.status(404).json({ message: 'Device not found' });
        }
        return res.status(200).json(device);
    }
    catch (error) {
        return handleError(res, error);
    }
});
exports.getDeviceById = getDeviceById;
const updateDeviceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, model, storage, password } = req.body;
        const updatedDevice = yield device_1.Device.findByIdAndUpdate(id, { name, model, storage, password }, { new: true });
        if (!updatedDevice) {
            return res.status(404).json({ message: 'Device not found' });
        }
        return res.status(200).json(updatedDevice);
    }
    catch (error) {
        return handleError(res, error);
    }
});
exports.updateDeviceById = updateDeviceById;
const deleteDeviceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedDevice = yield device_1.Device.findByIdAndDelete(id);
        if (!deletedDevice) {
            return res.status(404).json({ message: 'Device not found' });
        }
        return res.status(200).json({ message: 'Device deleted successfully' });
    }
    catch (error) {
        return handleError(res, error);
    }
});
exports.deleteDeviceById = deleteDeviceById;
function handleError(res, error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
}
