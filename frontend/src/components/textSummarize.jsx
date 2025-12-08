import React, { useState } from 'react';
import axios from 'axios';

const TextSummarize = () => {
    const [rawText, setRawText] = useState('');
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSummarize = async () => {
        if (!rawText.trim()) return;

        setLoading(true);
        setSummary('');

        try {
            // Retrieves the user's Auth Token from localStorage
            const userToken = localStorage.getItem('token');

            // Correctly calls the backend using the defined proxy and route path
            const response = await axios.post('/api/textSummarize', {
                rawText: rawText
            }, {
                // Sends the Auth Token for the 'auth' middleware check
                headers: { 'x-auth-token': userToken }
            });

            setSummary(response.data.summary);
        } catch (err) {
            console.error('API Error:', err);
            // Check the backend terminal for the real error (401, Rate Limit, etc.)
            setSummary('Summary generation failed. Check if your backend is running.');
        }
        setLoading(false);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            {/* Input Area */}
            <textarea
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                rows="10"
                style={{ width: '100%', marginBottom: '10px', borderRadius: '10px' }}
            />

            {/* Action Button */}
            <button className='border rounded-lg'
                onClick={handleSummarize}
                disabled={loading || !rawText.trim()}
                style={{ padding: '10px', backgroundColor: '#000039', color: 'white' }}
            >
                {loading ? 'Generating Summary...' : 'Generate Summary'}
            </button>

            {/* Output Area */}
            {summary && (
                <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '15px' }}>
                    <h4>Generated Summary:</h4>
                    <ul>
                        {summary.split('\n').map((point, idx) => (
                            <li key={idx}>{point.replace(/^- /, '• ')}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TextSummarize;