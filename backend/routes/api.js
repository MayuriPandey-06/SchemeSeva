import express from 'express';
import { protectedRoute } from '../middleware/authMiddleware.js';
import {
  getDashboard,
  getProfile,
  saveProfile,
  getFamily,
  addFamily,
  updateFamily,
  deleteFamily,
  getDocuments,
  uploadDocument,
  ocrExtract,
  getSchemes,
  submitApplication,
  getApplications,
} from '../controllers/apiController.js';

const router = express.Router();

router.use(protectedRoute);
router.get('/dashboard', getDashboard);
router.get('/profile', getProfile);
router.post('/profile', saveProfile);
router.get('/family', getFamily);
router.post('/family', addFamily);
router.put('/family/:id', updateFamily);
router.delete('/family/:id', deleteFamily);
router.get('/documents', getDocuments);
router.post('/documents', uploadDocument);
router.post('/ocr', ocrExtract);
router.get('/schemes', getSchemes);
router.post('/applications', submitApplication);
router.get('/applications', getApplications);

export default router;
