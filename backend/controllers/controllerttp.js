'use strict'

const rsa = require('rsa')
const bc = require('bigint-conversion')
const sha = require('object-sha')

let keys;
let k;
let Pko;
let pubKey_A;
let iv;

function getTest(req, res) {
    res.json({msn: 'Hello from TTP server!'});
}

function getPubKeyTTP(req, res) {
    keys = rsa.rsaKeyGeneration()
    console.log('pubkey: ',keys['publicKey'])
    console.log('privkey: ',keys['privateKey'])
    return res.status(200).send({e: bc.bigintToHex(keys['publicKey']['e']), n: bc.bigintToHex(keys['publicKey']['n'])})
}

function postK(req, res) {
    let bodyres = req.body
    console.log("body res: ", bodyres)
    let date = new Date()
    let time = date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
    // Proof of origin
}



module.exports = {
    getPubKeyTTP,
    getTest,
    postK
}