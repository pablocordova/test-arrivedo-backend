# TEST ARRIVEDO BACKEND

Web service that returns the top ten recommended places using the latitude and longitude of a spot.

## Use

1. Clone or download the project
2. inside the project make: 
```sh
$ npm install
$ npm start
```
## Route

### Get top 10 places

Example:

```GET http://localhost:3000/v1/places/top10?lat=40.722726166658305&lon=-73.996782318```

## Test

```sh
$ npm test
```