const express = require('express')
const router = express.Router()

//Controllers
const { createBuuCuc } = require('../controllers/buucuc.controller')
const { updateBuuCuc } = require('../controllers/buucuc.controller')
// const { disableBuuCuc } = require('../controllers/nguoidung.controller')
// const { enableBuuCuc } = require('../controllers/nguoidung.controller')
const { getAllBuuCuc } = require('../controllers/buucuc.controller')
const { getBuuCucById } = require('../controllers/buucuc.controller')

//Models
const models = require('../models/index')
const BuuCuc = models.BuuCuc

//Insert
router.post('/', createBuuCuc)

//Update data in DB
router.put('/:id', updateBuuCuc)

// disable a BuuCuc
// router.put('/:id/disable', disableBuuCuc)

// // enable a BuuCuc
// router.put('/:id/enable', enableBuuCuc)

// Query all data from DB
router.get('/', getAllBuuCuc)

//Get by Id?
router.get('/:id', getBuuCucById)


module.exports = router;