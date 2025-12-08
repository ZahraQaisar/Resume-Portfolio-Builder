import React, { useState } from 'react';
import { FaTimes, FaDownload } from 'react-icons/fa';
import html2pdf from 'html2pdf.js';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import MinimalistTemplate from './templates/MinimalistTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import CreativeTemplate from './templates/CreativeTemplate';

const TEMPLATES = [
    { id: 'modern', name: 'Modern', component: ModernTemplate },
    { id: 'classic', name: 'Classic', component: ClassicTemplate },
    { id: 'minimalist', name: 'Minimalist', component: MinimalistTemplate },
    { id: 'professional', name: 'Professional', component: ProfessionalTemplate },
    { id: 'creative', name: 'Creative', component: CreativeTemplate },
];

const ResumePreview = ({ resume, onClose, onTemplateChange }) => {
    const { content, template: initialTemplate } = resume;
    const [selectedTemplate, setSelectedTemplate] = useState(initialTemplate || 'modern');
    const [isDownloading, setIsDownloading] = useState(false);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString + '-01');
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    const formatDateRange = (start, end, current) => {
        const startDate = formatDate(start);
        const endDate = current ? 'Present' : formatDate(end);
        return `${startDate} - ${endDate}`;
    };

    const handleTemplateChange = (templateId) => {
        setSelectedTemplate(templateId);
        if (onTemplateChange) {
            onTemplateChange(templateId);
        }
    };

    const handleDownload = async () => {
        setIsDownloading(true);
        const element = document.getElementById('resume-content');
        const opt = {
            margin: 0,
            filename: `${content.personal?.name || 'resume'}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        try {
            await html2pdf().set(opt).from(element).save();
        } catch (error) {
            console.error('PDF generation failed:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setIsDownloading(false);
        }
    };

    const SelectedTemplateComponent = TEMPLATES.find(t => t.id === selectedTemplate)?.component || ModernTemplate;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Resume Preview</h2>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleDownload}
                            disabled={isDownloading}
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50"
                        >
                            <FaDownload />
                            {isDownloading ? 'Generating...' : 'Download PDF'}
                        </button>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2"
                        >
                            <FaTimes size={24} />
                        </button>
                    </div>
                </div>

                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar for Template Selection */}
                    <div className="w-64 bg-gray-100 dark:bg-gray-900 p-6 overflow-y-auto border-r border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Select Template</h3>
                        <div className="space-y-4">
                            {TEMPLATES.map((template) => (
                                <button
                                    key={template.id}
                                    onClick={() => handleTemplateChange(template.id)}
                                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${selectedTemplate === template.id
                                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-400'
                                        }`}
                                >
                                    <span className="font-medium text-gray-900 dark:text-white">{template.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Preview Area */}
                    <div className="flex-1 overflow-y-auto p-8 bg-gray-50 dark:bg-gray-900">
                        <SelectedTemplateComponent
                            content={content}
                            formatDate={formatDate}
                            formatDateRange={formatDateRange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumePreview;
