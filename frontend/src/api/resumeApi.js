import axios from 'axios';

const API_BASE_URL = 'https://backend-resume-builder.vercel.app/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Get all resumes for the authenticated user
export const getResumes = async () => {
    try {
        const response = await api.get('/resumes');
        return response.data;
    } catch (error) {
        console.error('Error fetching resumes:', error);
        throw error;
    }
};

// Get a specific resume by ID
export const getResume = async (id) => {
    try {
        const response = await api.get(`/resumes/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching resume:', error);
        throw error;
    }
};

// Create a new resume
export const createResume = async (data) => {
    try {
        const response = await api.post('/resumes', data);
        return response.data;
    } catch (error) {
        console.error('Error creating resume:', error);
        throw error;
    }
};

// Update an existing resume
export const updateResume = async (id, data) => {
    try {
        const response = await api.put(`/resumes/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating resume:', error);
        throw error;
    }
};

// Delete a resume
export const deleteResume = async (id) => {
    try {
        const response = await api.delete(`/resumes/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting resume:', error);
        throw error;
    }
};

