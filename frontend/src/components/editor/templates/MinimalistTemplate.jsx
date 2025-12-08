import React from 'react';

const MinimalistTemplate = ({ content, formatDate, formatDateRange }) => {
    return (
        <div className="bg-white text-gray-800 p-8 max-w-3xl mx-auto font-sans" id="resume-content">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-2">
                    {content.personal?.name || 'Your Name'}
                </h1>
                <div className="text-sm text-gray-500 flex flex-wrap gap-x-4 gap-y-1">
                    {content.personal?.email && <span>{content.personal.email}</span>}
                    {content.personal?.phone && <span>{content.personal.phone}</span>}
                    {content.personal?.location && <span>{content.personal.location}</span>}
                    {content.personal?.linkedin && (
                        <a href={content.personal.linkedin} className="hover:text-black">LinkedIn</a>
                    )}
                    {content.personal?.github && (
                        <a href={content.personal.github} className="hover:text-black">GitHub</a>
                    )}
                    {content.personal?.website && (
                        <a href={content.personal.website} className="hover:text-black">Portfolio</a>
                    )}
                </div>
            </div>

            {/* Summary */}
            {content.about && (
                <div className="mb-8">
                    <p className="text-gray-700 leading-relaxed max-w-2xl">{content.about}</p>
                </div>
            )}

            {/* Experience */}
            {content.experience && content.experience.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Experience</h2>
                    <div className="space-y-6">
                        {content.experience.map((exp) => (
                            <div key={exp.id} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="text-sm text-gray-500">
                                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                                </div>
                                <div className="md:col-span-3">
                                    <h3 className="font-medium text-gray-900">{exp.position}</h3>
                                    <div className="text-sm text-gray-600 mb-2">{exp.company}, {exp.location}</div>
                                    {exp.description && (
                                        <p className="text-sm text-gray-700 whitespace-pre-line">{exp.description}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Education */}
            {content.education && content.education.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Education</h2>
                    <div className="space-y-4">
                        {content.education.map((edu) => (
                            <div key={edu.id} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="text-sm text-gray-500">
                                    {formatDateRange(edu.startDate, edu.endDate)}
                                </div>
                                <div className="md:col-span-3">
                                    <h3 className="font-medium text-gray-900">{edu.school}</h3>
                                    <div className="text-sm text-gray-600">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </div>
                                    {edu.gpa && <div className="text-sm text-gray-500 mt-1">GPA: {edu.gpa}</div>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Skills */}
            {content.skills && content.skills.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Skills</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(
                            content.skills.reduce((acc, skill) => {
                                const category = skill.category || 'Other';
                                if (!acc[category]) acc[category] = [];
                                acc[category].push(skill.name);
                                return acc;
                            }, {})
                        ).map(([category, skills]) => (
                            <div key={category}>
                                <h3 className="text-sm font-medium text-gray-900 mb-1">{category}</h3>
                                <p className="text-sm text-gray-600">{skills.join(', ')}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Projects */}
            {content.projects && content.projects.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Projects</h2>
                    <div className="space-y-4">
                        {content.projects.map((project) => (
                            <div key={project.id}>
                                <div className="flex items-baseline gap-2 mb-1">
                                    <h3 className="font-medium text-gray-900">{project.name}</h3>
                                    <div className="flex gap-2 text-xs text-gray-500">
                                        {project.projectUrl && <a href={project.projectUrl} className="hover:text-black">View</a>}
                                        {project.githubUrl && <a href={project.githubUrl} className="hover:text-black">Code</a>}
                                    </div>
                                </div>
                                <p className="text-sm text-gray-700 mb-1">{project.description}</p>
                                {project.technologies && (
                                    <p className="text-xs text-gray-500">{project.technologies.join(', ')}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MinimalistTemplate;
