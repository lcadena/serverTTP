'use strict'

const rsa = require('rsa')
const bc = require('bigint-conversion')
const sha = require('object-sha')

let keys;
let k;
let Pko;

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
    console.log("body: ", bodyres)
    let date = new Date()
    let time = date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
    // Proof of origin of K
    Pko = req.body.signature
    k = req.body.k
    console.log("k del body: ", k)
    const body = {
        type: 4,
        ttp: 'TTP',
        src: 'A',
        dst: 'B',
        k: 'k',
        ts: time
    }
    // hash
    let digest = sha.digest(body, 'SHA-256')
    // hash en hexadecimal
    let digestH = bc.hexToBigint(digest)
    let signature = keys['privateKey'].sign(digestH)
    return res.status(200).send({body: body,
                                 signature: bc.bigintToHex(signature)})
}

module.exports = {
    getPubKeyTTP,
    getTest,
    postK
}