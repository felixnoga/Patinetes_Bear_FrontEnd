FROM node:19-alpine as build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
COPY . ./
ENV REACT_APP_BASE_URL="https://jwpmgquauu.eu-west-1.awsapprunner.com" 
ENV REACT_APP_MAP_PUBLIC_TOKEN="pk.eyJ1IjoiaXNpZHJvLWlzZW4iLCJhIjoiY2xkMG44bm05MTluZzNwdGc0YXZkamU3biJ9.S8QsL8ViQCI3Lo76GhXQGQ"
ENV REACT_APP_CARD_KEY="pk_test_51MWml3Hy8tHpgHZg1IxTOJepBXHddWYHa4ca6gMYWvpUWPTTEGECIOoBVASiLxgMYD7wqXdbWLB4I4Wc0zTTTg2N00SBUyGWVR"
RUN npm run build

FROM nginx:latest
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]