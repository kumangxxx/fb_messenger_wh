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
const moment = require('moment')
const cron = require('cron')

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
    let date_string = body.date + ':00Z'

    let gmt_7 = new Date( date_string ) // assuming date is GMT+7. for simplicity
    let utc = new Date( gmt_7.getTime() - ( 3600000 * 7 ) ) // get utc
    let now = Date.now() + 1000 // get now

    let date = new Date( utc <= now ? now : utc ) // if utc is already a past, then use now + 1 second
    console.log( 'scheduling at', date.getTime() / 1000 )

    let auto_start = true

    res.status( 200 ).json( { message: 'scheduled' } ) // send response

    let job = new cron.CronJob( date, () => { // create scheduled job
        console.log('firing!!')
        Promise.all( people.map( p =>  sendMessage( p, message, is_image )) )
        .then( console.log )
        .catch( console.log )
    }, () => {
    }, auto_start, 'UTC' )
})


app.listen(parseInt( process.env.port ) || 3000, (err) => {
    if ( err ) console.log( err )
    else console.log( 'running on ' + process.env.port )
})