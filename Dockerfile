FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build --configuration=production

FROM nginx:alpine
COPY --from=build /app/dist /tmp/dist
RUN find /tmp/dist -name "index.html" -exec dirname {} \; | xargs -I {} cp -r {}/* /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
