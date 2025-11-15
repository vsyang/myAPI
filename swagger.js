const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Pets & Owners API',
        description: 'A simple API to view owners and their pets'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger output
swaggerAutogen(outputFile, endpointsFiles, doc);