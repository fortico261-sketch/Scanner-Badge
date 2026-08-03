import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Scanner Badge API",
            version: "1.0.0",
            description: "API de gestion des employés, chantiers et pointages"
        },
        servers: [
            {
                url: "https://scanner-badge.onrender.com"
            },
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: [
        "./src/**/*.ts"
    ]
};

export const swaggerSpec = swaggerJsdoc(options);