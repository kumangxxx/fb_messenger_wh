'use strict'

require('dotenv').config()

/**
 * LOAD
 */
const express = require('express')
const body_parser = require('body-parser')
const jade = require('jade')
const mongoose = require('mongoose')
const sendMessage = require('./workers/facebook/sendMessage')

/**
 * CONNECT TO DB
 */
mongoose.connect(process.env.mongodb || 'mongodb://kamen:rider@localhost:27017/fb_messenger', { useMongoClient: true })
mongoose.Promise = global.Promise


/**
 * COMPILE JADES
 */
const templates = {
    home: jade.compileFile('./src/jades/home.jade')
}

/**
 * INITIALIZATIONS
 */
const app = express()

/**
 * ROUTING
 */

// Middlewares
app.use(body_parser.json())
app.use('/static', express.static(__dirname + '/static'))

// home
app.get('/', ( req, res ) => res.redirect('/page/dashboard'))

// pages
app.use('/page', require('./routers/pages')( templates ))

// WEBHOOKS
// facebook
app.use('/webhook/fb', require('./routers/wh_facebook'))

// API
// send message
app.post('/api/send', (req, res, next) => {

    let body = req.body
    let message = body.message
    let is_image = body.is_image
    let people = body.people

    Promise.all( people.map( p =>  sendMessage( p, message, is_image )) )
    .then( result => res.status( 200 ).json( result ) )
    .catch( err => res.status( 500 ).json( { message: err.message || 'internal server error' } ) )
})


app.listen(parseInt( process.env.port ) || 3000, (err) => {
    if ( err ) console.log( err )
    else console.log( 'running on ' + process.env.port )
})