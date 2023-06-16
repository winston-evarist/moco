const { Schema, model } = require("mongoose")
const { commonSchema } = require("../helpers/schema")

const schema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    code: {
        type: String,
        required: true
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

    paid: {
        type: String,
        required: true
    },

    remain: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    location: {
        type: Object,
        required: true
    },

    service: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    device: {
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

    status: {
        type: String,
        required: true
    },

    fee: {
        type: String,
        required: true
    },

    resetCode: {
        type: String,
        default: null
    },

    resetCodeExpires: {
        type: Date,
        default: null
    },

    payment: {
        type: String,
        required: true
    },

    ...commonSchema

}, {
    timestamps: true
})

// indexing
schema.index({ updatedAt: -1 }, { background: true })
schema.index({ createdAt: -1 }, { background: true })
schema.index({ name: -1 }, { background: true })
schema.index({ code: -1 }, { background: true })
schema.index({ service: -1 }, { background: true })
schema.index({ status: -1 }, { background: true })
schema.index({ description: -1 }, { background: true })
schema.index({ email: -1 }, { background: true })
schema.index({ timestamps: -1 }, { background: true })
schema.index({ location: -1 }, { background: true })
schema.plugin(require('mongoose-autopopulate'))

//model
const User = model('user', schema)

module.exports = User