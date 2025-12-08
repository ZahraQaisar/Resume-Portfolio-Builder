const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleware');
const { InferenceClient } = require('@huggingface/inference'); // fixed import

const hf = new InferenceClient(process.env.HF_ACCESS_TOKEN);

router.post('/', auth, async (req, res) => {
    const { unimprovedText } = req.body;

    if (!unimprovedText) {
        return res.status(400).json({ msg: "Text input is required!" });
    }

    try {
        const result = await hf.chatCompletion({
            model: 'deepseek-ai/DeepSeek-V3.2:novita',
            messages: [
                {
                    role: "user",
                    content: `Rewrite the following text with improved and professional grammar:\n\n${unimprovedText}`,
                }
            ],
            parameters: {
                min_length: 50,
                max_length: 250
            }
        });

        const improvedText = result.choices[0].message.content;

        res.status(200).json({ improvedText });

    } catch (error) {
        console.error("Hugging Face Error:", error.message);
        res.status(500).json({ msg: 'Failed to improve text, check server logs.' });
    }
});

module.exports = router;
