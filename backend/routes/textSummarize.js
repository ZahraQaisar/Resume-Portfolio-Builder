const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleware'); // Middleware dependency
const { InferenceClient } = require('@huggingface/inference'); // Node uses require

const hf = new InferenceClient(process.env.HF_ACCESS_TOKEN);

// @route   POST /api/textSummarize
// @desc    Get AI-generated resume summary
// @access  Private

router.post('/', auth, async (req, res) => {

    const { rawText } = req.body;

    if (!rawText) {
        return res.status(400).json({ msg: 'Text input is required.' });
    }

    try {
        const result = await hf.chatCompletion({
            model: 'deepseek-ai/DeepSeek-V3.2:novita',
            messages: [
                {
                    role: "user",
                    content: `Summarize this paragraph and turn it into listicles: \n${rawText}`,
                }
            ],
            parameters: {
                min_length: 50,
                max_length: 200
            }
        });

        // Extract the assistant's message
        const summary = result.choices[0].message.content;

        res.status(200).json({ summary });

    } catch (error) {
        console.error('Hugging Face Summarization Error:', error.message);
        res.status(500).json({ msg: 'AI summary failed. Check server logs.' });
    }

});

module.exports = router;