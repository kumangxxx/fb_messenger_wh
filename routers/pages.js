'use strict'

const express = require('express')
const personWorker = require('../workers/db/person')
const dateformat = require('dateformat')

module.exports = ( templates ) => {

    let router = express.Router()
    
    router.get('/dashboard', (req, res, next) => {
        let date = new Date( Date.now() + (5 * 30000) ) // add 3 minutes
        personWorker.get( {  } ).then( people => {
            res.send( templates.home( {
                people,
                groups: [],
                time: {
                    date: dateformat( date, 'yyyy-mm-dd' ),
                    hour: date.getHours(),
                    minute: date.getMinutes()
                }
            } ) )
        } )
    })

    return router

}