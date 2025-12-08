import React from 'react';

const CreativeTemplate = ({ content, formatDate, formatDateRange }) => {
    return (
        <div className="bg-white text-gray-800 max-w-3xl mx-auto font-sans shadow-lg overflow-hidden" id="resume-content">
            {/* Header */}
            <div className="bg-purple-600 text-white p-8">
                <h1 className="text-5xl font-extrabold mb-2 tracking-tight">
                    {content.personal?.name || 'Your Name'}
                </h1>
                <div className="flex flex-wrap gap-4 text-purple-100 text-sm font-medium">
                    {content.personal?.email && <span>{content.personal.email}</span>}
                    {content.personal?.phone && <span>{content.personal.phone}</span>}
                    {content.personal?.location && <span>{content.personal.location}</span>}
                </div>
                <div className="flex gap-4 mt-4 text-sm">
                    {content.personal?.linkedin && (
                        <a href={content.personal.linkedin} className="bg-white text-purple-600 px-3 py-1 rounded-full font-bold hover:bg-purple-100">LinkedIn</a>
                    )}
                    {content.personal?.github && (
                        <a href={content.personal.github} className="bg-white text-purple-600 px-3 py-1 rounded-full font-bold hover:bg-purple-100">GitHub</a>
                    )}
                    {content.personal?.website && (
                        <a href={content.personal.website} className="bg-white text-purple-600 px-3 py-1 rounded-full font-bold hover:bg-purple-100">Portfolio</a>
                    )}
                </div>
            </div>

            <div className="p-8">
                {/* Summary */}
                {content.about && (
                    <div className="mb-8 bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
                        <p className="text-gray-700 italic text-lg leading-relaxed">"{content.about}"</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Column */}
                    <div className="md:col-span-2 space-y-8">
                        {/* Experience */}
                        {content.experience && content.experience.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
                                    <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
                                    Experience
                                </h2>
                                <div className="space-y-6">
                                    {content.experience.map((exp) => (
                                        <div key={exp.id} className="relative pl-6 border-l-2 border-purple-200">
                                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-400 border-2 border-white"></div>
                                            <div className="mb-1">
                                                <h3 className="text-xl font-bold text-gray-800">{exp.position}</h3>
                                                <div className="text-purple-600 font-medium">{exp.company}</div>
                                            </div>
                                            <div className="text-sm text-gray-500 mb-2">
                                                {formatDateRange(exp.startDate, exp.endDate, exp.current)} | {exp.location}
                                            </div>
                                            {exp.description && (
                                                <p className="text-gray-600 whitespace-pre-line">{exp.description}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Projects */}
                        {content.projects && content.projects.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
                                    <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
                                    Projects
                                </h2>
                                <div className="grid grid-cols-1 gap-4">
                                    {content.projects.map((project) => (
                                        <div key={project.id} className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-bold text-gray-800 text-lg">{project.name}</h3>
                                                <div className="flex gap-2 text-xs">
                                                    {project.projectUrl && <a href={project.projectUrl} className="text-purple-600 font-bold hover:underline">VIEW</a>}
                                                    {project.githubUrl && <a href={project.githubUrl} className="text-purple-600 font-bold hover:underline">CODE</a>}
                                                </div>
                                            </div>
                                            <p className="text-gray-600 text-sm mb-2">{project.description}</p>
                                            {project.technologies && (
                                                <div className="flex flex-wrap gap-1">
                                                    {project.technologies.map((tech, idx) => (
                                                        <span key={idx} className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Column */}
                    <div className="space-y-8">
                        {/* Skills */}
                        {content.skills && content.skills.length > 0 && (
                            <div>
                                <h2 className="text-xl font-bold text-purple-800 mb-4 border-b-2 border-purple-200 pb-2">Skills</h2>
                                <div className="space-y-4">
                                    {Object.entries(
                                        content.skills.reduce((acc, skill) => {
                                            const category = skill.category || 'Other';
                                            if (!acc[category]) acc[category] = [];
                                            acc[category].push(skill.name);
                                            return acc;
                                        }, {})
                                    ).map(([category, skills]) => (
                                        <div key={category}>
                                            <h3 className="text-sm font-bold text-gray-700 mb-2 uppercase">{category}</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {skills.map((skill, idx) => (
                                                    <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Education */}
                        {content.education && content.education.length > 0 && (
                            <div>
                                <h2 className="text-xl font-bold text-purple-800 mb-4 border-b-2 border-purple-200 pb-2">Education</h2>
                                <div className="space-y-4">
                                    {content.education.map((edu) => (
                                        <div key={edu.id}>
                                            <div className="font-bold text-gray-800">{edu.school}</div>
                                            <div className="text-sm text-purple-600">{edu.degree}</div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                {formatDateRange(edu.startDate, edu.endDate)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Certifications */}
                        {content.certifications && content.certifications.length > 0 && (
                            <div>
                                <h2 className="text-xl font-bold text-purple-800 mb-4 border-b-2 border-purple-200 pb-2">Certifications</h2>
                                <div className="space-y-3">
                                    {content.certifications.map((cert) => (
                                        <div key={cert.id} className="text-sm">
                                            <div className="font-bold text-gray-800">{cert.name}</div>
                                            <div className="text-gray-500">{cert.organization}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreativeTemplate;
