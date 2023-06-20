const { Schema, model } = require("mongoose")
const { commonSchema } = require("../helpers/schema")

const schema = new Schema({

    name: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    blog: {
        type: String,
        required:true
    },

    ...commonSchema

}, {
    timestamps: true
})

// indexing
schema.index({ updatedAt: -1 }, { background: true })
schema.index({ createdAt: -1 }, { background: true })
schema.index({ name: -1 }, { background: true })
schema.index({ phone: -1 }, { background: true })
schema.index({ blog: -1 }, { background: true })

//model
const Comment = model('comment', schema)

module.exports = Comment