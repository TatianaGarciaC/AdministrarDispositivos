import React, { useState, useEffect } from 'react';
import api from '../api';
import '../DeviceList.css';
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import CryptoJS from 'crypto-js';

const DeviceList: React.FC = () => {
  const [devices, setDevices] = useState<any[]>([]);
  const [editingDeviceId, setEditingDeviceId] = useState<string | null>(null);
  const [newDevice, setNewDevice] = useState<any>({ name: '', model: '', storage: '', encryptedPassword: '' });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await api.get('/devices');
        setDevices(response.data);
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    };

    fetchDevices();
  }, []);

    const handleEdit = (deviceId: string) => {
      const deviceToEdit = devices.find(device => device._id === deviceId);
      if (deviceToEdit) {
        setNewDevice(deviceToEdit);
        setEditingDeviceId(deviceId);
      }
    };


const handleSave = async () => {
  try {
    let updatedDevices: any[];

    if (newDevice._id) {
      // Si el dispositivo ya tiene un _id, significa que es una actualización
      const originalDevice = devices.find(device => device._id === newDevice._id);
      if (originalDevice && originalDevice.encryptedPassword === newDevice.encryptedPassword) {
        // Si la contraseña no ha cambiado, guardar los demás campos sin modificar la contraseña encriptada
        await api.put(`/devices/${newDevice._id}`, { ...newDevice });
        updatedDevices = devices.map(device =>
          device._id === newDevice._id ? { ...newDevice } : device
        );
      } else {
        // Si la contraseña ha cambiado, encriptarla y guardarla
        const encryptedPassword = CryptoJS.SHA256(newDevice.encryptedPassword).toString();
        await api.put(`/devices/${newDevice._id}`, { ...newDevice, encryptedPassword });
        updatedDevices = devices.map(device =>
          device._id === newDevice._id ? { ...newDevice, encryptedPassword } : device
        );
      }
    } else {
      // Si es un nuevo dispositivo, simplemente guardar los campos sin encriptar la contraseña
      // Realizar la solicitud POST para crear un nuevo dispositivo
      const response = await api.post('/devices', { ...newDevice });

      // Extraer el _id del dispositivo recién creado de la respuesta del servidor
      const createdDeviceId = response.data._id;

      // Actualizar la lista de dispositivos con el dispositivo recién creado
      updatedDevices = [...devices, { ...newDevice, _id: createdDeviceId }];
    }

    // Actualizar el estado con la lista de dispositivos actualizada
    setDevices(updatedDevices);
    setEditingDeviceId(null);
    setNewDevice({ name: '', model: '', storage: '', encryptedPassword: '' });
  } catch (error) {
    console.error('Error saving device:', error);
  }
};



  const handleCancelEdit = () => {
    setEditingDeviceId(null);
    setNewDevice({ name: '', model: '', storage: '', encryptedPassword: '' });
  };

  const handleDelete = async (deviceId: string) => {
    try {
      await api.delete(`/devices/${deviceId}`);
      setDevices(devices.filter(device => device._id !== deviceId));
    } catch (error) {
      console.error('Error deleting device:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setNewDevice({ ...newDevice, [field]: e.target.value });
  };

  const handleAdd = () => {
    if (editingDeviceId === null) {
      setNewDevice({ name: '', model: '', storage: '', encryptedPassword: '' });
      setEditingDeviceId(newDevice._id);
    } else {
      console.log('Ya hay un dispositivo en modo de edición');
    }
  };

  return (
    <div className="device-list-container">
      <h1>Lista de Dispositivos</h1>
      <button className="add-device-button" onClick={handleAdd}><FaPlus /> Crear Dispositivo</button>
      <table className="device-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Modelo</th>
            <th>Almacenamiento</th>
            <th>Contrase&ntilde;a</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {editingDeviceId !== null && (
            <tr>
              <td>
                <input
                  type="text"
                  value={newDevice.name}
                  onChange={(e) => handleInputChange(e, 'name')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={newDevice.model}
                  onChange={(e) => handleInputChange(e, 'model')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={newDevice.storage}
                  onChange={(e) => handleInputChange(e, 'storage')}
                />
              </td>
              <td>
              <div style={{ whiteSpace: 'pre-wrap' }}>
                <input
                  type="text"
                  value={newDevice.encryptedPassword}
                  onChange={(e) => handleInputChange(e, 'encryptedPassword')}
                  placeholder="Contrase&ntilde;a"
                /> </div>
              </td>
              <td>
                <button onClick={handleSave}>Guardar <FaSave /></button>
                <button onClick={handleCancelEdit}>Cancelar <FaTimes /></button>
              </td>
            </tr>
          )}
          {devices.map(device => (
            <tr key={device._id}>
              <td>{device.name}</td>
              <td>{device.model}</td>
              <td>{device.storage}</td>
              <td>{device.encryptedPassword}</td>
              <td>
                <>
                  <button onClick={() => handleEdit(device._id)}>Editar <FaEdit /></button>
                  <button onClick={() => handleDelete(device._id)}>Eliminar <FaTrash /></button>
                </>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceList;
