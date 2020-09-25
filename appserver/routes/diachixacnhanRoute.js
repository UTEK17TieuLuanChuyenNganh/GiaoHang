const express = require('express')
const router = express.Router()

//Controllers
const { createDiaChiXacNhan } = require('../controllers/diachixacnhan.controller')
const { updateDiaChiXacNhan } = require('../controllers/diachixacnhan.controller')
const { getAllDiaChiXacNhan } = require('../controllers/diachixacnhan.controller')
const { getDiaChiXacNhanById } = require('../controllers/diachixacnhan.controller')

//Models
const models = require('../models/index')
const DiaChiXacNhan = models.DiaChiXacNhan

//Insert
router.post('/', createDiaChiXacNhan)

//Update data in DB
router.put('/:id', updateDiaChiXacNhan)

// // disable a DiaChiXacNhan
// router.put('/:id/disable', disableDiaChiXacNhan)

// // enable a DiaChiXacNhan
// router.put('/:id/enable', enableDiaChiXacNhan)

// Query all data from DB
router.get('/', getAllDiaChiXacNhan)

//Get by Id?
router.get('/:id', getDiaChiXacNhanById)

module.exports = router;