# Fend Travel App

## Description
this is the final udacity nodejs express project with asynchronous function
to use external api services.
Also with webpack and webpack plugins.
for managing build releases for different environment and minifing css and js files.

## Development
javascript ES6, HTML5, CSS, nodejs 20, express and webpack

## Instruction

### Setting up the project 
followin udacity instructions; please note that my personal api key is not included in the project.
- create an api key in 
    - [geonames](https://www.geonames.org/)
    - [pixabay](https://pixabay.com/)
    - [weatherbit](https://www.weatherbit.io/)

- create a file named **-.env-** in the project root.
- write your api key in **-.env-** file in the same format and variable names

```js
GEO_API_KEY = ${key}
WHEATERBIT_API_KEY = ${key}
PIXABAY_API_KEY = ${key}
```
- please use nodejs version 20.
- **DON'T** use npm install command
- use this command insted
```shell
command npm ci
```

### Runing the project
for production build and run
```shell
command npm run build-prod
command npm start
```
then navigate to localhoat:8081 in your browser

for development build and run
``` shell
command npm start
command npm run build-dev
```
then navigate to localhoat:8082 in your browser

for runing test using jest
``` shell
command npm run test
```

## Table of Contents
- [Fend Travel App](#Fend-Travel-App)
- [Description](#description)
- [Instruction](#instruction)
- [Setting up the project](#setting-up-the-project)
- [Runing the project](#Runing-the-project)
- [Table of Contents](#table-of-contents)
- [Development](#development)

## Resources
Resources I used to develope the project
- [geonames](https://www.geonames.org/) for geo coordinates
- [pixabay](https://pixabay.com/) for images by name
- [weatherbit](https://www.weatherbit.io/) for weather info