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
const fastify_1 = __importDefault(require("fastify"));
const mongoose_1 = __importDefault(require("mongoose"));
// @ts-ignore
const fastify_cors_1 = __importDefault(require("fastify-cors"));
const deviceController_1 = require("./controllers/deviceController");
const app = (0, fastify_1.default)();
app.register(fastify_cors_1.default, {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
});
const fetchMongoDBURI = () => __awaiter(void 0, void 0, void 0, function* () {
    const { exec } = require('child_process');
    return new Promise((resolve, reject) => {
        exec("kubectl get secret mongodb-secret -o=jsonpath='{.data.MONGODB_URI}'", (err, stdout, stderr) => {
            if (err) {
                reject(err);
                return;
            }
            const mongodbURI = Buffer.from(stdout.trim(), 'base64').toString('utf-8');
            resolve(mongodbURI);
        });
    });
});
const connectToMongoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mongodbURI = yield fetchMongoDBURI();
        if (!mongodbURI) {
            throw new Error('No se encontr� la URI de conexi�n a MongoDB en el secreto.');
        }
        yield mongoose_1.default.connect(mongodbURI);
        console.log('Conexi�n exitosa a MongoDB.');
    }
    catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1);
    }
});
connectToMongoDB();
app.post('/api/devices', deviceController_1.createDevice);
app.get('/api/devices', deviceController_1.getDevices);
app.get('/api/devices/:id', deviceController_1.getDeviceById);
app.put('/api/devices/:id', deviceController_1.updateDeviceById);
app.delete('/api/devices/:id', deviceController_1.deleteDeviceById);
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening on ${address}`);
});
