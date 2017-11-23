'use strict'

const request = require( 'request' )

module.exports = ( user_id ) => {

    return new Promise( (resolve, reject) => {

        request({
            uri: 'https://graph.facebook.com/v2.11/' + user_id,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + process.env.facebook_access_token
            }
        }, (err, response, response_body) => {
            if ( err ) return reject(err)
            let json = JSON.parse( response_body )
            resolve( { 
                id: user_id, 
                name: json.first_name + ' ' + (json.last_name || ''), 
                image: json.profile_pic || '' 
            } )
        })

    } )

}