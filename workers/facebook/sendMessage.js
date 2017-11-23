'use strict'

const access_token = process.env.facebook_access_token || ''
const request = require('request')

module.exports = ( recipient = '', message = '', is_image = false ) => {
    var message

    if (is_image == true) {
        message = {
            attachment: {
                type: 'image',
                payload: {
                    url: message
                }
            }
        }
    } else {
        message = {
            text: message
        }
    }

    // if ( image_url ) {
    //     // message.attachment = { 
    //     //     type: 'image',
    //     //     payload: {
    //     //         url: image_url
    //     //     }
    //     // }
    // }

    return new Promise( ( resolve, reject ) => {

        request( {
            method: 'POST',
            uri: 'https://graph.facebook.com/v2.6/me/messages?access_token=' + access_token,
            json: {
                recipient: {
                    id: recipient
                },
                message
            }
        }, (err, response, response_body) => {
            if (err) {
                reject( err )
            } else {
                resolve( response_body )
            }
        } )

    } )

    
}