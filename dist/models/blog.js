const { Schema, model } = require("mongoose")
const { commonSchema } = require("../helpers/schema")

const schema = new Schema({

    title: {
        type: String,
        required: true,
        index: true
    },

    description: {
        type: String,
        required: true
    },

    pic: {
        type: String,
        required: false
    },

    category: {
        ref: 'category',
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
schema.index({ title: -1 }, { background: true })
schema.index({ description: -1 }, { background: true })
schema.index({ category: -1 }, { background: true })
schema.plugin(require('mongoose-autopopulate'))

//model
const Blog = model('blog', schema)

module.exports = Blog