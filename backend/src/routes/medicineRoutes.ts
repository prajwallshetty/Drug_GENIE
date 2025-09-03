import express from 'express';
import {
  getMedicineByName,
  searchMedicines,
  getAllMedicines,
} from '../controllers/medicineController';

const router = express.Router();

// GET /api/medicines/search?query=medicine_name - Search medicines by partial name
router.get('/search', searchMedicines);

// GET /api/medicines/:name - Get specific medicine by exact name
router.get('/:name', getMedicineByName);

// GET /api/medicines - Get all medicines with pagination
router.get('/', getAllMedicines);

export default router;
