const { Schema } = require("mongoose")

module.exports = commonSchema = {

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        index: true,
        autopopulate: { maxDepth: 1 }
    },

    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        default: null,
        index: true,
        autopopulate: { maxDepth: 1 }
    },

}