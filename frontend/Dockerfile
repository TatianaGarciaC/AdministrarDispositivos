# Etapa de construcción
FROM node:14 as build-stage

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos de configuración y dependencias del frontend
COPY package*.json ./
RUN npm install

# Copia el resto de los archivos del frontend
COPY ./ ./

# Construye la aplicación de frontend
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copia los archivos construidos del frontend a NGINX
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expone el puerto en el que escuchará NGINX
EXPOSE 80

# Define el comando para iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]
