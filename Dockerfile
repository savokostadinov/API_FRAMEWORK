FROM node:18
LABEL authors="Lenovo"
WORKDIR /e2e

COPY ["package.json", "./"]
RUN npm install --force
COPY . .
