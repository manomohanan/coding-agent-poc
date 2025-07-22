import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { requestLogger, corsHandler } from './middleware/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const swaggerDocument = YAML.load(join(__dirname, '../openapi.yaml'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsHandler);
app.use(requestLogger);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.json({
    message: 'Swagger Petstore API',
    version: '1.0.27-SNAPSHOT',
    documentation: '/docs',
    openapi: '/openapi.yaml'
  });
});

app.get('/openapi.yaml', (req, res) => {
  res.sendFile(join(__dirname, '../openapi.yaml'));
});

app.use(routes);

app.use(notFoundHandler);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 API Documentation available at http://localhost:${PORT}/docs`);
  console.log(`🔧 OpenAPI spec available at http://localhost:${PORT}/openapi.yaml`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

export default app;