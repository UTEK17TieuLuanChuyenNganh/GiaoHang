const express = require('express')
const router = express.Router()

//Controllers
const { createShipper } = require('../controllers/shipper.controller')
const { updateShipper } = require('../controllers/shipper.controller')
const { getAllShipper } = require('../controllers/shipper.controller')
const { getShipperById } = require('../controllers/shipper.controller')
const { getShipperByUsername } = require('../controllers/shipper.controller')
//Models
const models = require('../models/index')
const Shipper = models.Shipper

//Insert
router.post('/', createShipper)

//Update data in DB
router.put('/:id', updateShipper)

// Query all data from DB
router.get('/', getAllShipper)

//Get by Id?
router.get('/:id', getShipperById)

router.get('/:usn/username', getShipperByUsername)
module.exports = router;