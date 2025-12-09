import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');

    // In a real app, verify the session ID with the backend here

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <div className="max-w-md w-full text-center bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                <FaCheckCircle className="mx-auto h-16 w-16 text-green-500 mb-6" />
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Payment Successful!</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                    Thank you for your purchase. Your plan has been upgraded.
                </p>
                <div className="space-y-4">
                    <Link to="/dashboard" className="block w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
