let mongoose = require("mongoose")
let Schema = mongoose.Schema

let noteSchema = new Schema({
    content: {
        type: String
    },
    tag: {
        type: String
    }
}, {
    collection: 'notes'
})

module.exports = mongoose.model('note', noteSchema)