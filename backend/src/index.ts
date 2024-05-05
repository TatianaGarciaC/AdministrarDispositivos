import fastify from 'fastify';
import mongoose from 'mongoose';
// @ts-ignore
import fastifyCors from 'fastify-cors';
import { createDevice, getDevices, getDeviceById, updateDeviceById, deleteDeviceById } from './controllers/deviceController';

const app = fastify();

app.register(fastifyCors, {
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

const fetchMongoDBURI = async () => {
    const { exec } = require('child_process');
    return new Promise<string>((resolve, reject) => {
        exec("kubectl get secret mongodb-secret -o=jsonpath='{.data.MONGODB_URI}'", (err: any, stdout: string, stderr: string) => {
            if (err) {
                reject(err);
                return;
            }
            const mongodbURI = Buffer.from(stdout.trim(), 'base64').toString('utf-8');
            resolve(mongodbURI);
        });
    });
};

const connectToMongoDB = async () => {
    try {
        const mongodbURI = await fetchMongoDBURI();
        if (!mongodbURI) {
            throw new Error('No se encontró la URI de conexión a MongoDB en el secreto.');
        }

        await mongoose.connect(mongodbURI);
        console.log('Conexión exitosa a MongoDB.');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1);
    }
};

connectToMongoDB();

app.post('/api/devices', createDevice);
app.get('/api/devices', getDevices);
app.get('/api/devices/:id', getDeviceById);
app.put('/api/devices/:id', updateDeviceById);
app.delete('/api/devices/:id', deleteDeviceById);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening on ${address}`);
});
