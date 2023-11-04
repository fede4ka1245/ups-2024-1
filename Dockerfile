FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN apt update
RUN apt install -y ffmpeg
COPY . .
CMD [ "node", "index.js" ]