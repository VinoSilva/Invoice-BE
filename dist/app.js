"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import libraries
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
// Import routes
const invoiceRoutes_1 = __importDefault(require("./routes/invoiceRoutes"));
// Import middlewares
const errorHandler_1 = require("./middlewares/errorHandler");
// Import swagger
const swagger_1 = require("./swagger");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Routes
// app.use("/api/items", itemRoutes);
app.use('/api/invoices', invoiceRoutes_1.default);
// Mount Swagger UI
const openApiDocument = (0, swagger_1.generateOpenApiDocument)();
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(openApiDocument));
// Global error handler (should be after routes)
app.use(errorHandler_1.errorHandler);
exports.default = app;
