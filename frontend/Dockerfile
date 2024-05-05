# Etapa de construcci�n
FROM node:14 as build-stage

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos de configuraci�n y dependencias del frontend
COPY package*.json ./
RUN npm install

# Copia el resto de los archivos del frontend
COPY ./ ./

# Construye la aplicaci�n de frontend
RUN npm run build

# Etapa de producci�n
FROM nginx:alpine

# Copia los archivos construidos del frontend a NGINX
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expone el puerto en el que escuchar� NGINX
EXPOSE 80

# Define el comando para iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]