FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build --configuration=production

FROM nginx:alpine
COPY --from=build /app/dist /tmp/dist
RUN APP_DIR=$(find /tmp/dist -type f -name "index.html" -exec dirname {} \; | head -n 1) && cp -r $APP_DIR/* /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
