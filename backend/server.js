import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';

import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { default: apiRoutes } = await import('./routes/api.js');
const { default: adminRoutes } = await import('./routes/admin.js');
const { errorHandler } = await import('./middleware/errorHandler.js');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: '*' })); // Allow all for unified deployment
app.use(express.json());
app.use(fileUpload({ createParentPath: true, limits: { fileSize: 15 * 1024 * 1024 }, abortOnLimit: true }));

// API Routes
app.use('/api', apiRoutes);
app.use('/api/admin', adminRoutes);

// Static Frontend Serving
const frontendPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendPath));

// Fallback for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Unified server running on port ${port}`);
});
