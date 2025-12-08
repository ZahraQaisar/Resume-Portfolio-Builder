import React from 'react';

const ClassicTemplate = ({ content, formatDate, formatDateRange }) => {
    return (
        <div className="bg-white text-black p-8 max-w-3xl mx-auto font-serif" id="resume-content">
            {/* Header */}
            <div className="text-center border-b-2 border-black pb-4 mb-6">
                <h1 className="text-3xl font-bold uppercase tracking-wider mb-2">
                    {content.personal?.name || 'Your Name'}
                </h1>
                <div className="flex justify-center gap-4 text-sm">
                    {content.personal?.email && <span>{content.personal.email}</span>}
                    {content.personal?.phone && <span>| {content.personal.phone}</span>}
                    {content.personal?.location && <span>| {content.personal.location}</span>}
                </div>
                <div className="flex justify-center gap-4 text-sm mt-1">
                    {content.personal?.linkedin && (
                        <a href={content.personal.linkedin} className="hover:underline">LinkedIn</a>
                    )}
                    {content.personal?.github && (
                        <a href={content.personal.github} className="hover:underline">GitHub</a>
                    )}
                    {content.personal?.website && (
                        <a href={content.personal.website} className="hover:underline">Portfolio</a>
                    )}
                </div>
            </div>

            {/* Summary */}
            {content.about && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b border-black mb-2">Professional Summary</h2>
                    <p className="text-sm leading-relaxed">{content.about}</p>
                </div>
            )}

            {/* Experience */}
            {content.experience && content.experience.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b border-black mb-2">Experience</h2>
                    {content.experience.map((exp) => (
                        <div key={exp.id} className="mb-4">
                            <div className="flex justify-between font-bold">
                                <span>{exp.company}</span>
                                <span>{exp.location}</span>
                            </div>
                            <div className="flex justify-between italic text-sm mb-1">
                                <span>{exp.position}</span>
                                <span>{formatDateRange(exp.startDate, exp.endDate, exp.current)}</span>
                            </div>
                            {exp.description && (
                                <p className="text-sm whitespace-pre-line">{exp.description}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Education */}
            {content.education && content.education.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b border-black mb-2">Education</h2>
                    {content.education.map((edu) => (
                        <div key={edu.id} className="mb-2">
                            <div className="flex justify-between font-bold">
                                <span>{edu.school}</span>
                                <span>{formatDateRange(edu.startDate, edu.endDate)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>{edu.degree} {edu.field && `in ${edu.field}`}</span>
                                {edu.gpa && <span>GPA: {edu.gpa}</span>}
                            </div>
                            {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
                        </div>
                    ))}
                </div>
            )}

            {/* Skills */}
            {content.skills && content.skills.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b border-black mb-2">Skills</h2>
                    <div className="text-sm">
                        {Object.entries(
                            content.skills.reduce((acc, skill) => {
                                const category = skill.category || 'Other';
                                if (!acc[category]) acc[category] = [];
                                acc[category].push(skill.name);
                                return acc;
                            }, {})
                        ).map(([category, skills]) => (
                            <div key={category} className="mb-1">
                                <span className="font-bold">{category}: </span>
                                <span>{skills.join(', ')}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Projects */}
            {content.projects && content.projects.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b border-black mb-2">Projects</h2>
                    {content.projects.map((project) => (
                        <div key={project.id} className="mb-3">
                            <div className="flex justify-between font-bold text-sm">
                                <span>{project.name}</span>
                                <div className="flex gap-2">
                                    {project.projectUrl && <a href={project.projectUrl} className="hover:underline">Link</a>}
                                    {project.githubUrl && <a href={project.githubUrl} className="hover:underline">GitHub</a>}
                                </div>
                            </div>
                            <p className="text-sm">{project.description}</p>
                            {project.technologies && (
                                <p className="text-xs italic mt-1">Tech: {project.technologies.join(', ')}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Certifications */}
            {content.certifications && content.certifications.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b border-black mb-2">Certifications</h2>
                    {content.certifications.map((cert) => (
                        <div key={cert.id} className="mb-2 text-sm">
                            <div className="flex justify-between font-bold">
                                <span>{cert.name}</span>
                                <span>{cert.issueDate && formatDate(cert.issueDate)}</span>
                            </div>
                            <div>{cert.organization}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ClassicTemplate;
