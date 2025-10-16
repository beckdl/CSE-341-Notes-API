const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Notes API',
        description: 'A simple CRUD API to manage notes for users.',
    },
    host: 'cse-341-notes-api.onrender.com',
    schemes: ['https', 'http'],
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);