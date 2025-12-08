const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const auth = require('../middleware/authMiddleware');

// @route   POST api/payment/create-checkout-session
// @desc    Create Stripe Checkout Session
// @access  Private
router.post('/create-checkout-session', auth, async (req, res) => {
    try {
        const { planId } = req.body;

        // Map planId to price (In a real app, this should come from DB or env)
        // Simple mapping for this demo:
        let priceAmount = 0;
        let planName = '';

        if (planId === 'pro') {
            priceAmount = 900; // $9.00 in cents
            planName = 'Pro Plan - Monthly';
        } else if (planId === 'expert') {
            priceAmount = 1900; // $19.00 in cents
            planName = 'Expert Plan - Monthly';
        } else {
            return res.status(400).json({ msg: 'Invalid plan ID' });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: planName,
                        },
                        unit_amount: priceAmount,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment', // or 'subscription' if you want recurring
            success_url: `http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:5173/payment-cancel`,
        });

        res.json({ id: session.id, url: session.url });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
