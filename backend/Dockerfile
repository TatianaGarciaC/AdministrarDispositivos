# Usa la imagen de Node.js como base
FROM node:14

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos de configuración y dependencias del backend
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install

# Copia el resto de los archivos del backend
COPY ./ ./

# Expone el puerto en el que escuchará el servidor de backend
EXPOSE 3000

# Define el comando para iniciar el servidor de backend
CMD ["npm", "start"]
