import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Portfolio = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // id here is the resumeId as per our route definition in frontend (we will configure App.jsx to pass resume ID or portfolio ID)
                // Adjusting backend route to accept resumeID makes it easier for the manager page.
                const res = await axios.get(`http://localhost:5000/api/portfolio/public/${id}`);
                setData(res.data);
                if (res.data.settings.theme === 'dark') {
                    setDarkMode(true);
                }
            } catch (err) {
                setError(err.response?.data?.msg || 'Failed to load portfolio');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    if (!data) return null;

    const { content } = data;

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Header */}
                <header className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                        {content.fullName || 'Your Name'}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6">
                        {content.title || 'Professional Title'}
                    </p>
                    <div className="flex justify-center space-x-4 text-gray-500 dark:text-gray-400">
                        {content.email && <span>{content.email}</span>}
                        {content.phone && <span>• {content.phone}</span>}
                        {content.location && <span>• {content.location}</span>}
                    </div>
                </header>

                {/* Summary */}
                {content.summary && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 border-b-2 border-blue-500 inline-block">About Me</h2>
                        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                            {content.summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {content.experience && content.experience.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6 border-b-2 border-blue-500 inline-block">Experience</h2>
                        <div className="space-y-8">
                            {content.experience.map((exp, index) => (
                                <div key={index} className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500"></div>
                                    <h3 className="text-xl font-semibold">{exp.position}</h3>
                                    <div className="text-blue-600 dark:text-blue-400 mb-2">{exp.company}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                        {exp.startDate} - {exp.endDate || 'Present'}
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {content.education && content.education.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6 border-b-2 border-blue-500 inline-block">Education</h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            {content.education.map((edu, index) => (
                                <div key={index} className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
                                    <h3 className="text-lg font-semibold mb-1">{edu.school}</h3>
                                    <div className="text-blue-600 dark:text-blue-400 mb-2">{edu.degree}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        {edu.startDate} - {edu.endDate || 'Present'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {content.skills && content.skills.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold mb-6 border-b-2 border-blue-500 inline-block">Skills</h2>
                        <div className="flex flex-wrap gap-3">
                            {content.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 font-medium"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default Portfolio;
