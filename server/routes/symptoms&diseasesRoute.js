const express = require('express');
const router = express.Router();
const { addSymptomController,getAllSymptoms, addDisease } = require('../controllers/symptomsNdiseasesCtrl');

router.post('/add-symptom', addSymptomController);
router.get('/getAllSymptoms', getAllSymptoms)
router.post('/addDisease', addDisease)

module.exports = router;
