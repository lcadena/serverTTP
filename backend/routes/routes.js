'use strict'

const express = require('express')
const ttpCtrl = require('../controllers/controllerttp')
const api = express.Router()


api.get('/', ttpCtrl.getTest)
// api.get('/gmessage', msgCtrl.getMsg)
// api.get('/pubkey', msgCtrl.getPubKey)
// api.post('/pmessage', msgCtrl.postMsg)
// api.post('/sign')

module.exports = api