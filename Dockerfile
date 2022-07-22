FROM node
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5000 27017
CMD ["npm", "start"]
