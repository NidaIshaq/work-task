const express = require('express');
const router = express.Router();
const { addSymptomController,getAllSymptoms, addDisease, searchDiseases, diseaseDetails} = require('../controllers/symptomsNdiseasesCtrl');

router.post('/add-symptom', addSymptomController);
router.get('/getAllSymptoms', getAllSymptoms)
router.post('/addDisease', addDisease)
router.post('/searchDiseases', searchDiseases);
router.get('/diseaseDetails/:id', diseaseDetails)

module.exports = router;
