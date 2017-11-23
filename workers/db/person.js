'use strict'

const Person = require('../../schemas/person')

module.exports = {
    
    get: ( where ) => {
        return Person.find( where )
    },

    upsert: ( id, attribute ) => {
        // just in case
        delete attribute.id
        delete attribute._id

        return Person.update( { _id: id }, attribute, { upsert: true } )
    }

}