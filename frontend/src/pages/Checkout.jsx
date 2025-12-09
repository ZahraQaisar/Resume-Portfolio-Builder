import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

// Replace with your actual publishable key or environment variable
// In a real app, use import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
const stripePromise = loadStripe('pk_test_51Sc5WMACuWTqsGDySACQ6iKUjg9ZsJ5nxLenyYgh18mlizWeYvWShLIJ26PkyZbfGi9vbMroh9XX6pzqznhZ8SDA003tB1waxJ');

const Checkout = () => {
    const location = useLocation();
    // Default to 'pro' if no state passed, just for safety
    const planId = location.state?.planId || 'pro';
    const planName = planId === 'pro' ? 'Pro Plan' : 'Expert Plan';
    const planPrice = planId === 'pro' ? '$9/mo' : '$19/mo';

    const handleCheckout = async () => {
        const stripe = await stripePromise;

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                }
            };

            const body = { planId };

            const response = await axios.post('https://backend-resume-builder.vercel.app/api/payment/create-checkout-session', body, config);

            if (response.data.url) {
                window.location.href = response.data.url;
            } else {
                console.error("No checkout URL returned from backend");
            }
        } catch (error) {
            console.error("Error redirecting to checkout:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-10 rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        Checkout
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Complete your purchase to unlock premium features.
                    </p>
                </div>

                <div className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="p-4 border rounded-md border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Order Summary</h3>
                            <div className="flex justify-between mt-4">
                                <span className="text-gray-600 dark:text-gray-300">{planName}</span>
                                <span className="font-semibold text-gray-900 dark:text-white">{planPrice}</span>
                            </div>
                            <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4 flex justify-between font-bold text-lg">
                                <span className="text-gray-900 dark:text-white">Total</span>
                                <span className="text-blue-600">{planPrice}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleCheckout}
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                        Proceed to Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
