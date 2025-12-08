import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimesCircle } from 'react-icons/fa';

const PaymentCancel = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <div className="max-w-md w-full text-center bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                <FaTimesCircle className="mx-auto h-16 w-16 text-red-500 mb-6" />
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Payment Cancelled</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                    Your payment was cancelled. No charges were made.
                </p>
                <Link to="/" className="block w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition">
                    Return Home
                </Link>
            </div>
        </div>
    );
};

export default PaymentCancel;
