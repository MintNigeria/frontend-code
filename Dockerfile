FROM node:14.20 as build-step1



RUN mkdir -p /mint_client
WORKDIR /mint_client

COPY package.json package-lock.json ./

RUN npm install -g @angular/cli@14
#RUN npm install nodejs
RUN npm install

#WORKDIR ./nibss1/

COPY . /mint_client/

RUN npm install --save-dev @angular-devkit/build-angular
#RUN  ng build --prod
RUN ng build --configuration=production
#COPY --from=build-step1 web.config /home/ebills-admin/current-frontend/Ebills-Frontend/ebills-admin-app /nibss-admin/dist/ebills-admin
#

FROM nginx:1.17.1-alpine



COPY --from=build-step1 /mint_client/dist/mint-client  /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf