const express = require('express')
const router = express.Router()

//Controllers
const { createCustomer } = require('../controllers/nguoidung.controller')
const { updateCustomer } = require('../controllers/nguoidung.controller')
const { disableCustomer } = require('../controllers/nguoidung.controller')
const { enableCustomer } = require('../controllers/nguoidung.controller')
const { getAllCustomer } = require('../controllers/nguoidung.controller')
const { getCustomerById } = require('../controllers/nguoidung.controller')
const { getCustomerByEmail } = require('../controllers/nguoidung.controller')
const { getCustomerByUsername } = require('../controllers/nguoidung.controller')

//Models
const models = require('../models/index')
const Customer = models.Customer

//Insert
router.post('/', createCustomer)

//Update data in DB
router.put('/:id', updateCustomer)

// disable a customer
router.put('/:id/disable', disableCustomer)

// enable a customer
router.put('/:id/enable', enableCustomer)

// Query all data from DB
router.get('/', getAllCustomer)

//Get by Id?
router.get('/:id', getCustomerById)

//Get user by Email
router.get('/:email/email', getCustomerByEmail)

router.get('/:username/username', getCustomerByUsername)
module.exports = router;