# Set version for specific version to O2Switch
FROM node:20.9.0

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

ENV CHOKIDAR_USEPOLLING=true

# Drop all tables, migrate, and run seeders AND run server
CMD npm run dev
