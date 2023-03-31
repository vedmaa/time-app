FROM node:alpine AS BUILDER

WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

#---

FROM nginx:alpine AS FINAL

WORKDIR /app
COPY --from=BUILDER /app/dist .
COPY nginx.conf /etc/nginx/nginx.conf
