'use strict'

const mongoose = require('mongoose')
module.exports = mongoose.model('Person', {
    _id: String,
    name: String,
    image: String
})