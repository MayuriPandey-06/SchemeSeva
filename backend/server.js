import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';

dotenv.config();

const { default: apiRoutes } = await import('./routes/api.js');
const { default: adminRoutes } = await import('./routes/admin.js');
const { errorHandler } = await import('./middleware/errorHandler.js');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:4173' }));
app.use(express.json());
app.use(fileUpload({ createParentPath: true, limits: { fileSize: 15 * 1024 * 1024 }, abortOnLimit: true }));

app.use('/api', apiRoutes);
app.use('/api/admin', adminRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
