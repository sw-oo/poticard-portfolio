FROM node:24.12.0-slim AS builder

WORKDIR /app

# docker-compose에서 빌드를 하는데, 그 값이 VITE_BACKEND_URL로 전달되고
ARG VITE_BACKEND_URL

# 전달받은 ARG를 ENV에 적용시켜 빌드 진행
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

# package.json 파일만 있으면 빌드가 가능하다
# front는 back과 다르게 VITE로 빌드 하는 시점에 환경변수가 적용되기때문에
COPY package.json ./

RUN npm install

COPY ./ ./
RUN npm run build

FROM nginx:latest

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]