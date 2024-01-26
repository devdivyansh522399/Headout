FROM node:21-alpine as x86

#Create a app directory
WORKDIR /app

#install app dependencies
COPY package.json ./
RUN npm install

#bundle app source
COPY . .

#Expose port
EXPOSE 8080

CMD [ "npm", "start" ]

