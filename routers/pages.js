'use strict'

const express = require('express')
const personWorker = require('../workers/db/person')

module.exports = ( templates ) => {

    let router = express.Router()
    
    router.get('/dashboard', (req, res, next) => {
        personWorker.get( {  } ).then( people => {
            res.send( templates.home( {
                people,
                groups: []
            } ) )
        } )
    })

    return router

}