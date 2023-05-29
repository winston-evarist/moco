const { Schema, model } = require("mongoose")
const { commonSchema } = require("../helpers/schema")

const schema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: String,
        required: true,
        unique: true
    },

    role: {
        type: String,
        default: 'customer'
    },

    password: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        default: null,
        autopopulate: { maxDepth: 1 }
    },

    updated_by: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        default: null,
        autopopulate: { maxDepth: 1 }
    },

    email: {
        type: String,
        required: false
    },

    ...commonSchema

}, {
    timestamps: true
})

// indexing
schema.index({ updatedAt: -1 }, { background: true })
schema.index({ createdAt: -1 }, { background: true })
schema.index({ name: -1 }, { background: true })
schema.index({ email: -1 }, { background: true })
schema.index({ timestamps: -1 }, { background: true })
schema.index({ location: -1 }, { background: true })
schema.plugin(require('mongoose-autopopulate'))

//model
const User = model('user', schema)

module.exports = User