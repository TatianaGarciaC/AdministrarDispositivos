import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import '../Header.css'; 
import { FaUser } from 'react-icons/fa'; 

const Header: React.FC = () => {
  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Realiza una solicitud GET al API de Random User
        const response = await axios.get('https://randomuser.me/api/');
        // Extrae los datos del usuario del cuerpo de la respuesta
        const user = response.data.results[0];
        // Almacena los datos del usuario en el estado
        setUserData({
          firstName: user.name.first,
          lastName: user.name.last,
          city: user.location.city,
          country: user.location.country,
          username: user.login.username,
          picture: user.picture
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <header className="header-container"> {}
      <div className="user-info">
      <img src={userData.picture?.large} alt="Profile" /> {}
        <div className="user-details">
        <p>Nombre: {userData.firstName}</p>
          <p>Apellido: {userData.lastName}</p>
          <p>Ciudad: {userData.city}</p>
          <p>Pa&iacute;s: {userData.country}</p>
          <p>Usuario: {userData.username}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
