<<<<<<< HEAD
Inventario de Dispositivos
Este es un proyecto de aplicaci�n web para gestionar un inventario de dispositivos. La aplicaci�n consta de un frontend desarrollado con React y un backend construido con Node.js y Fastify, y utiliza una base de datos MongoDB para almacenar los datos.

Requisitos previos
Aseg�rate de tener instalados los siguientes requisitos previos antes de comenzar:

Docker Desktop: Descargar e instalar Docker Desktop
Instalaci�n y ejecuci�n
Clona este repositorio en tu m�quina local:
bash
Copy code
git clone <url-del-repositorio>
Navega a los directorios frontend y backend:
bash
Copy code
cd frontend
bash
Copy code
cd backend
Construye las im�genes de Docker para el frontend y el backend:
bash
Copy code
docker build -t inventario-frontend .

bash
Copy code
docker build -t inventario-backend .

si falla npm cache clean --force y npm i

Etiqueta las im�genes y s�belas a tu registro local (opcional):
bash
Copy code
docker tag inventario-frontend localhost:5000/inventario-frontend
docker tag inventario-backend localhost:5000/inventario-backend
kubectl create secret generic mongodb-secret --from-literal=username=tu_usuario --from-literal=password=tu_contrase�a

Verificar que el servicio Docker Registry est� en ejecuci�n

docker ps -a

docker run -d -p 5000:5000 --restart=always --name registry registry:2

docker push localhost:5000/inventario-frontend
docker push localhost:5000/inventario-backend
Inicia los contenedores de Docker para el frontend y el backend:
bash
Copy code
docker run -d -p 3001:80 inventario-frontend
docker run -d -p 3000:3000 inventario-backend

cd kubernates
kubectl apply -f deployment.yaml


Accede a la aplicaci�n desde tu navegador web:
Frontend: http://localhost:3001
Backend: http://localhost:3000/api
Contribuci�n
Las contribuciones son bienvenidas. Si encuentras alg�n problema o deseas mejorar este proyecto, por favor abre un problema o env�a una solicitud de extracci�n.

Licencia
Este proyecto est� bajo la Licencia MIT. Consulta el archivo LICENSE para m�s detalles.
=======
# AdministrarDispositivos
Sistema de Inventario de Dispositivos: Gestión Eficiente con React.js Node.js MongoDB Atlas y Secret Kubernates
>>>>>>> 27b26721c44c49e1aed400a68c7cc5a5e781df9d
