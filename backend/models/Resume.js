const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: Object, // Flexible structure for resume data
        default: {},
    },
    template: {
        type: String,
        default: 'modern',
    },
}, { timestamps: true });

module.exports = mongoose.model('Resume', ResumeSchema);
