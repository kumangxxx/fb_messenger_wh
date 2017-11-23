'use strict'

const express = require('express')
const validator = require('../workers/facebook/validator')
const getPersonDetail = require('../workers/facebook/getPersonDetail')
const extractSenders = require('../workers/facebook/extractSenders')

const personWorker = require('../workers/db/person')

let router = express.Router()

router.get('/', (req, res, next) => {
    console.log( 'swt' )
    let result = validator( req.query['hub.mode'], req.query['hub.verify_token'], req.query['hub.challenge'] )
    console.log( result )
    res.status( result.code || 500 ).send( result.data || '500' )
})

router.post('/', (req, res, next) => {

    // console.log( 'webhook' )
    // console.log( JSON.stringify( req.body ), null, 2 )

    let body = req.body
    extractSenders( body )
    .then( senders => Promise.all(  // upsert the senders simultanously
        senders.map( s => 
            getPersonDetail( s.id ) // get person detail
            .then( s => personWorker.upsert( s.id, s ) ) // insert to db 
        ) 
    ).then( console.log ) ) // log the result
    .catch( console.log ) // log the error

    res.status(200).json( { message: 'ok' } )
})

module.exports = router