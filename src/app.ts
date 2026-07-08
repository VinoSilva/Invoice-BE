// Import libraries
import express from 'express';
import swaggerUi from 'swagger-ui-express';

// Import routes
import invoiceRoutes from './routes/invoiceRoutes';

// Import middlewares
import { errorHandler } from './middlewares/errorHandler';

// Import swagger
import { generateOpenApiDocument } from './swagger';

const app = express();

app.use(express.json());

// Routes
// app.use("/api/items", itemRoutes);
app.use('/api/invoices', invoiceRoutes);

// Mount Swagger UI
const openApiDocument = generateOpenApiDocument();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
