const { Schema, model } = require("mongoose")
const { commonSchema } = require("../helpers/schema")

const schema = new Schema({

    name: {
        type: String,
        required: true,
        index: true
    },

    product: {
        ref: 'product',
        type: Schema.Types.ObjectId,
        default: null,
        index: true,
        autopopulate: { maxDepth: 1 }
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

    ...commonSchema

}, {
    timestamps: true
})

// indexing
schema.index({ updatedAt: -1 }, { background: true })
schema.index({ createdAt: -1 }, { background: true })
schema.index({ name: -1 }, { background: true })
schema.index({ product: -1 }, { background: true })
schema.plugin(require('mongoose-autopopulate'))

//model
const Brand = model('brand', schema)

module.exports = Brand