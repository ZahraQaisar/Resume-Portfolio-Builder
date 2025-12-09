import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const PortfolioManager = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [resumes, setResumes] = useState([]);
    const [localLoading, setLocalLoading] = useState(true);
    const { loading: authLoading } = useContext(AuthContext);

    useEffect(() => {
        if (authLoading) return; // Wait for auth to be ready

        const fetchData = async () => {
            try {
                const [resumesRes, portfoliosRes] = await Promise.all([
                    axios.get('https://backend-resume-builder.vercel.app/api/resumes'),
                    axios.get('https://backend-resume-builder.vercel.app/api/portfolio'),
                ]);
                setResumes(resumesRes.data);
                setPortfolios(portfoliosRes.data);
            } catch (err) {
                console.error("Error fetching data", err);
            } finally {
                setLocalLoading(false);
            }
        };
        fetchData();
    }, [authLoading]);

    const togglePublic = async (resumeId, currentStatus, currentTheme) => {
        try {
            const res = await axios.post('https://backend-resume-builder.vercel.app/api/portfolio/config', {
                resumeId,
                isPublic: !currentStatus,
                theme: currentTheme || 'light',
            });

            // Update local state
            const updatedList = [...portfolios];
            const index = updatedList.findIndex(p => p.resume && (p.resume._id === resumeId || p.resume === resumeId));

            if (index > -1) {
                updatedList[index] = res.data;
            } else {
                updatedList.push(res.data);
            }
            setPortfolios(updatedList);

            // Re-fetch to ensure clean state implies simpler logic usually but let's stick to optimistic or simple update
            // actually, the portfolio list response structure might differ from create response slightly (populate)
            // so simplest is to reload or just update carefully.
            // Let's reload for safety in this "minimal touch" approach
            window.location.reload();

        } catch (err) {
            console.error(err);
        }
    };

    const toggleTheme = async (resumeId, isPublic, currentTheme) => {
        try {
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            await axios.post('https://backend-resume-builder.vercel.app/api/portfolio/config', {
                resumeId,
                isPublic: isPublic,
                theme: newTheme,
            });
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    }

    if (authLoading || localLoading) return <div className="p-8">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Portfolio Manager</h1>
                    <Link to="/dashboard" className="text-blue-600 hover:text-blue-800">Back to Dashboard</Link>
                </div>

                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <ul className="divide-y divide-gray-200">
                        {resumes.map(resume => {
                            const portfolio = portfolios.find(p => p.resume && p.resume._id === resume._id);
                            const isPublic = portfolio ? portfolio.isPublic : false;
                            const theme = portfolio ? portfolio.theme : 'light';

                            return (
                                <li key={resume._id} className="p-6 flex items-center justify-between hover:bg-gray-50">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">{resume.title}</h3>
                                        <p className="text-sm text-gray-500">ID: {resume._id}</p>
                                        {isPublic && (
                                            <a
                                                href={`/p/${resume._id}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-indigo-600 hover:text-indigo-900 text-sm mt-1 inline-block"
                                            >
                                                View Live Website
                                            </a>
                                        )}
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        {/* Theme Toggle */}
                                        <button
                                            onClick={() => toggleTheme(resume._id, isPublic, theme)}
                                            disabled={!isPublic}
                                            className={`px-3 py-1 rounded text-sm font-medium border ${theme === 'dark' ? 'bg-gray-800 text-white border-gray-900' : 'bg-white text-gray-900 border-gray-300'
                                                } ${!isPublic ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                                        >
                                            {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                                        </button>

                                        {/* Public Toggle */}
                                        <button
                                            onClick={() => togglePublic(resume._id, isPublic, theme)}
                                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${isPublic ? 'bg-green-600' : 'bg-gray-200'
                                                }`}
                                        >
                                            <span
                                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isPublic ? 'translate-x-5' : 'translate-x-0'
                                                    }`}
                                            />
                                        </button>
                                        <span className="text-sm text-gray-500 w-16 text-right">
                                            {isPublic ? 'Public' : 'Private'}
                                        </span>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    {resumes.length === 0 && (
                        <div className="p-6 text-center text-gray-500">
                            No resumes found. Create one in the Dashboard first.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PortfolioManager;
