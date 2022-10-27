FROM node:17

#Working directory
WORKDIR /usr/src/app

#Copy Package Json from file
COPY package*.json ./

#intall file
RUN npm install

# copy source files
COPY .  .

#built
RUN npm run start

#Expose the port
EXPOSE 3000

CMD [ "node", "app.js"]