const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Medium Clone API",
            version: "1.0.0",
            description: "A RESTful API for a Medium-like blogging platform with role-based access control",
            contact: {
                name: "Kamlesh",
                email: "kamllesh.yadav@gmail.com"
            }
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Development server"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: "Enter your JWT token (without 'Bearer' prefix)"
                }
            },
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        _id: { 
                            type: "string",
                            example: "507f1f77bcf86cd799439011"
                        },
                        name: { 
                            type: "string",
                            example: "John Doe"
                        },
                        email: { 
                            type: "string",
                            example: "john@example.com"
                        },
                        role: { 
                            type: "string", 
                            enum: ["user", "moderator", "admin"],
                            example: "user"
                        },
                        isActive: { 
                            type: "boolean",
                            example: true
                        },
                        createdAt: { 
                            type: "string",
                            format: "date-time"
                        },
                        updatedAt: { 
                            type: "string",
                            format: "date-time"
                        }
                    }
                },
                Post: {
                    type: "object",
                    properties: {
                        _id: { 
                            type: "string",
                            example: "507f1f77bcf86cd799439011"
                        },
                        title: { 
                            type: "string",
                            example: "My First Blog Post"
                        },
                        content: { 
                            type: "string",
                            example: "This is the content of my blog post..."
                        },
                        author: {
                            type: "object",
                            properties: {
                                _id: { type: "string" },
                                name: { type: "string" },
                                email: { type: "string" }
                            }
                        },
                        status: { 
                            type: "string", 
                            enum: ["draft", "published"],
                            example: "published"
                        },
                        isActive: { 
                            type: "boolean",
                            example: true
                        },
                        createdAt: { 
                            type: "string",
                            format: "date-time"
                        },
                        updatedAt: { 
                            type: "string",
                            format: "date-time"
                        }
                    }
                },
                Error: {
                    type: "object",
                    properties: {
                        message: { 
                            type: "string",
                            example: "Error message"
                        }
                    }
                }
            }
        }
    },
    apis: [__dirname + "/../routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;