'use strict'

const local_token = process.env.LOCAL_TOKEN || 'kamenrider'

module.exports = ( mode = '', token = '', challenge = '' ) => {
    
    console.log( mode, token, local_token, challenge )

    if (mode && token && mode === 'subscribe' && token === local_token) {
        console.log( 'idx' )
        return { code: 200, data: challenge }
    } else {
        return { code: 500, data: null }
    }

}