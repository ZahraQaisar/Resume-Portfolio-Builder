const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleware');
const { InferenceClient } = require('@huggingface/inference');

const hf = new InferenceClient(process.env.HF_ACCESS_TOKEN);

router.post('/', auth, async (req, res) => {
    const { unprofessionalText } = req.body;

    if (!unprofessionalText) {
        return res.status(400).json({ msg: 'Text input is required.' });
    }

    try {
        const result = await hf.chatCompletion({
            model: 'deepseek-ai/DeepSeek-V3.2:novita',
            messages: [
                {
                    role: "user",
                    content: `Rewrite the following text in a clear, formal, and professional tone:\n\n${unprofessionalText}`,
                }
            ],
            parameters: {
                min_length: 50,
                max_length: 250
            }
        });

        const professionalText = result.choices[0].message.content;

        res.status(200).json({ professionalText });

    } catch (error) {
        console.error('Hugging Face Error:', error.message);
        res.status(500).json({ msg: 'Professionalization failed. Check server logs.' });
    }
});

module.exports = router;