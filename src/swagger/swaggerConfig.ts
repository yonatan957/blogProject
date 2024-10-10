import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';

const options:swaggerJSDoc.Options = {
    definition:{
        openapi:'3.0.0',
        info:{
            title: 'posts Swagger documentation',
            version: '1.0.0',
            description: 'A documentation for posts project'
        }
    },
    apis:['src/../dist/routes/*.js']
}

const specs = swaggerJSDoc(options)

export {specs, swaggerUi}