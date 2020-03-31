'use strict'

function getTest(req, res) {
    res.json({msn: 'Hello from TTP server!'});
}

module.exports = {
    getTest
}