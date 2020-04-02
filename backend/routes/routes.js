'use strict'

const express = require('express')
const ttpCtrl = require('../controllers/controllerttp')
const api = express.Router()


api.get('/', ttpCtrl.getTest)
api.get('/pubkeyTP', ttpCtrl.getPubKeyTTP)
// api.get('/gmessage', msgCtrl.getMsg)
api.post('/pm3', ttpCtrl.post)
// api.post('/sign')

module.exports = api