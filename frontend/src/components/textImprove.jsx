import React, { useState } from "react";
import axios from "axios";

const TextImprove = () => {
    const [unimprovedText, setUnimprovedText] = useState('');
    const [improvedText, setImprovedText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleImprove = async () => {
        if (!unimprovedText.trim()) return;

        setLoading(true);
        setImprovedText('');

        try {
            const userToken = localStorage.getItem('token');

            const response = await axios.post('/api/textImprove', { // fixed missing slash
                unimprovedText
            }, {
                headers: { 'x-auth-token': userToken }
            });

            setImprovedText(response.data.improvedText);
        } catch (err) {
            console.error('API Error:', err);
            setImprovedText('Professional text generation failed. Check backend.');
        }

        setLoading(false);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <textarea
                value={unimprovedText}
                onChange={(e) => setUnimprovedText(e.target.value)}
                rows="10"
                style={{ width: '100%', marginBottom: '10px', borderRadius: '10px' }}
            />

            <button className='border rounded-lg'
                onClick={handleImprove}
                disabled={loading || !unimprovedText.trim()}
                style={{ padding: '10px', backgroundColor: '#000039', color: 'white' }}
            >
                {loading ? 'Improving...' : 'Improve Text'}
            </button>

            {improvedText && (
                <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '15px' }}>
                    <h4>Professional Version:</h4>
                    <p>{improvedText}</p>
                </div>
            )}
        </div>
    );
}

export default TextImprove;
