FROM keymetrics/pm2:latest-alpine

# Bundle APP files
COPY app app/
COPY config config/
COPY mocks mocks/
COPY package.json .
COPY pm2.json .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install

# Show current folder structure in logs
RUN ls -al -R

CMD [ "npm", "run", "start:production" ]
RUN pm2 install pm2-auto-pull
RUN pm2 install pm2-server-monit
