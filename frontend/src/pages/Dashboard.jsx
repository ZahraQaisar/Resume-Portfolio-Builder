import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import TextSummarize from '../components/textSummarize';

const Dashboard = () => {
    const [resumes, setResumes] = useState([]);
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/resumes');
                setResumes(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchResumes();
    }, []);

    const createResume = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/resumes', {
                title: 'New Resume',
                content: {},
            });
            setResumes([res.data, ...resumes]);
        } catch (err) {
            console.error(err);
        }
    };

    const deleteResume = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/resumes/${id}`);
            setResumes(resumes.filter((resume) => resume._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <button
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Logout
                    </button>
                </div>

                <div className="mb-6">
                    <button
                        onClick={createResume}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Create New Resume
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resumes.map((resume) => (
                        <div key={resume._id} className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-2">{resume.title}</h2>
                            <p className="text-gray-600 text-sm mb-4">
                                Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
                            </p>
                            <div className="flex justify-between">
                                <button className="text-blue-600 hover:text-blue-800">
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteResume(resume._id)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <TextSummarize />
            </div>
        </div>

    );
};

export default Dashboard;
