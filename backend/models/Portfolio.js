const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    resume: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resume',
        required: true,
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    theme: {
        type: String,
        default: 'light', // 'light' or 'dark'
    },
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', PortfolioSchema);
