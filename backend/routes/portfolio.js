const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Portfolio = require('../models/Portfolio');
const Resume = require('../models/Resume');

// @route   GET api/portfolio
// @desc    Get all portfolios for logged-in user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const portfolios = await Portfolio.find({ user: req.user.id }).populate('resume', 'title');
        res.json(portfolios);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/portfolio/config
// @desc    Create or update portfolio settings
// @access  Private
router.post('/config', auth, async (req, res) => {
    const { resumeId, isPublic, theme } = req.body;

    try {
        let portfolio = await Portfolio.findOne({ user: req.user.id, resume: resumeId });

        if (portfolio) {
            // Update existing
            portfolio.isPublic = isPublic;
            portfolio.theme = theme;
            await portfolio.save();
            return res.json(portfolio);
        }

        // Create new
        portfolio = new Portfolio({
            user: req.user.id,
            resume: resumeId,
            isPublic,
            theme,
        });

        await portfolio.save();
        res.json(portfolio);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/portfolio/public/:id
// @desc    Get public resume data by Portfolio Configuration ID (or Resume ID - logic below uses Resume ID for simplicity in URL if preferred, but let's key off Portfolio ID or look up by Resume ID)
//          Let's verify by Resume ID as that's what the user has handy usually.
// @access  Public
router.get('/public/:resumeId', async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne({ resume: req.params.resumeId });

        if (!portfolio || !portfolio.isPublic) {
            return res.status(404).json({ msg: 'Portfolio not found or private' });
        }

        const resume = await Resume.findById(req.params.resumeId);
        if (!resume) {
            return res.status(404).json({ msg: 'Resume data not found' });
        }

        res.json({
            settings: portfolio,
            content: resume.content,
            title: resume.title
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
