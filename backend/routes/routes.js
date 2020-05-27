'use strict'

const express = require('express')
const ttpCtrl = require('../controllers/controllerttp')
const api = express.Router()


api.get('/', ttpCtrl.getTest)
api.get('/pubkeyTTP', ttpCtrl.getPubKeyTTP)
api.get('/getk', ttpCtrl.downloadK)
api.post('/pm3', ttpCtrl.postK)
// api.post('/sign')

module.exports = api