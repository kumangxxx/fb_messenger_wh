'use strict'

module.exports = ( payload, callback ) => new Promise( ( resolve, reject ) => {
    
    if ( payload.object !== 'page' ) {
        reject( 'not-page')
    } else {
        let senders = payload.entry
        .map( entry => entry.messaging[0] ) // take the first message of each entry
        .map( message => message.sender) // take the sender
        resolve( senders )
    }  

} )