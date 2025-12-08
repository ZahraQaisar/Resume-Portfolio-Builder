import React, { useState } from 'react';
import axios from 'axios';

const TextProfessionalize = () => {
    const [unprofessionalText, setUnprofessionalText] = useState('');
    const [professionalText, setProfessionalText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleProfessionalize = async () => {
        if (!unprofessionalText.trim()) return;

        setLoading(true);
        setProfessionalText('');

        try {
            const userToken = localStorage.getItem('token');

            const response = await axios.post('/api/textProfessionalize', {
                unprofessionalText
            }, {
                headers: { 'x-auth-token': userToken }
            });

            setProfessionalText(response.data.professionalText);
        } catch (err) {
            console.error('API Error:', err);
            setProfessionalText('Professional text generation failed. Check backend.');
        }

        setLoading(false);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <textarea
                value={unprofessionalText}
                onChange={(e) => setUnprofessionalText(e.target.value)}
                rows="10"
                style={{ width: '100%', marginBottom: '10px', borderRadius: '10px' }}
            />

            <button className='border rounded-lg'
                onClick={handleProfessionalize}
                disabled={loading || !unprofessionalText.trim()}
                style={{ padding: '10px', backgroundColor: '#000039', color: 'white' }}
            >
                {loading ? 'Converting...' : 'Professionalize Text'}
            </button>

            {professionalText && (
                <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '15px' }}>
                    <h4>Professional Version:</h4>
                    <p>{professionalText}</p>
                </div>
            )}
        </div>
    );
};

export default TextProfessionalize;