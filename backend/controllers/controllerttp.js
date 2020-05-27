'use strict'

const rsa = require('rsa')
const bc = require('bigint-conversion')
const sha = require('object-sha')

let keys;
let k;
let Pko;
let pubKeyA;
let iv;
let bodyA;
let signatureA;

function getTest(req, res) {
    res.json({msn: 'Hello from TTP server!'});
}

function getPubKeyTTP(req, res) {
    keys = rsa.rsaKeyGeneration()
    console.log('pubkey: ',keys['publicKey'])
    console.log('privkey: ',keys['privateKey'])
    return res.status(200).send({e: bc.bigintToHex(keys['publicKey']['e']), n: bc.bigintToHex(keys['publicKey']['n'])})
}

async function postK(req, res) {
    let bodyres = req.body
    console.log("body res: ", bodyres)
    let date = new Date()
    let time = date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
    // Proof of origin of K
    Pko = req.body.signature
    console.log('Pko: ', Pko)
    // pubKey de A
    pubKeyA = new rsa.PublicKey(bc.hexToBigint(req.body.publicKey.e), bc.hexToBigint(req.body.publicKey.n))
    console.log('pubKeyA en TTP: ', pubKeyA)
    const digestProof = bc.bigintToHex(pubKeyA.verify(bc.hexToBigint(req.body.signature)))
    console.log('digestProof ttp: ', digestProof)
    const digestBody = await sha.digest(req.body.body)
    console.log('digestBody ttp: ', digestBody)
    // Verificar el timestamp
    let tsTTP = Date.now();
    if ((digestBody === digestProof)) {
        k = bc.hexToBuf(req.body.body.msg)
        console.log('k: ', k)
        iv = req.body.body.iv
        console.log('iv: ', iv)
        const body = {
            type: '4',
            ttp: 'TTP',
            src: 'A',
            dst: 'B',
            k: k,
            iv: iv,
            timestamp: tsTTP
        }
        const digest = await sha.digest(body, 'SHA-256')
        const digestH = bc.hexToBigint(digest)
        const signature = await keys['privateKey'].sign(digestH)
        bodyA = body
        signatureA = bc.bigintToHex(signature)
        return res.status(200).send({
            body: body,
            signature: bc.bigintToHex(signature)
        })
    } else { console.log('Error en la recepción del mensaje')}
}

function downloadK(req, res) {
    console.log('Download k------')
    console.log('k: ', k)
    return res.status(200).send({
        body: bodyA,
        signature: signatureA,
        publicKey: {
            e: bc.bigintToHex(keys.publicKey.e),
            n: bc.bigintToHex(keys.publicKey.n)
        }
    })
}



module.exports = {
    getPubKeyTTP,
    getTest,
    postK,
    downloadK
}