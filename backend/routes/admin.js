import express from 'express';
import { protectedRoute, adminRoute } from '../middleware/authMiddleware.js';
import {
  listSchemes,
  createScheme,
  editScheme,
  removeScheme,
} from '../controllers/adminController.js';

const router = express.Router();

router.use(protectedRoute, adminRoute);
router.get('/schemes', listSchemes);
router.post('/schemes', createScheme);
router.put('/schemes/:id', editScheme);
router.delete('/schemes/:id', removeScheme);

export default router;
