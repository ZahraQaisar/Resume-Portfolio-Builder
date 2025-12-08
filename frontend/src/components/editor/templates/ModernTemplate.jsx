import React from 'react';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaGlobe, FaMapMarkerAlt, FaCalendar } from 'react-icons/fa';

const ModernTemplate = ({ content, formatDate, formatDateRange }) => {
    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-3xl mx-auto" id="resume-content">
            {/* Personal Info Header */}
            {content.personal && (
                <div className="mb-8 pb-6 border-b-2 border-gray-300 dark:border-gray-600">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        {content.personal.name || 'Your Name'}
                    </h1>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mt-4">
                        {content.personal.email && (
                            <div className="flex items-center gap-2">
                                <FaEnvelope />
                                <a href={`mailto:${content.personal.email}`} className="hover:text-blue-600">
                                    {content.personal.email}
                                </a>
                            </div>
                        )}
                        {content.personal.phone && (
                            <div className="flex items-center gap-2">
                                <FaPhone />
                                <span>{content.personal.phone}</span>
                            </div>
                        )}
                        {content.personal.linkedin && (
                            <div className="flex items-center gap-2">
                                <FaLinkedin />
                                <a href={content.personal.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                                    LinkedIn
                                </a>
                            </div>
                        )}
                        {content.personal.github && (
                            <div className="flex items-center gap-2">
                                <FaGithub />
                                <a href={content.personal.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                                    GitHub
                                </a>
                            </div>
                        )}
                        {content.personal.website && (
                            <div className="flex items-center gap-2">
                                <FaGlobe />
                                <a href={content.personal.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                                    Portfolio
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* About Section */}
            {content.about && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-300 dark:border-gray-600">
                        Professional Summary
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {content.about}
                    </p>
                </div>
            )}

            {/* Experience Section */}
            {content.experience && content.experience.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-300 dark:border-gray-600">
                        Work Experience
                    </h2>
                    <div className="space-y-6">
                        {content.experience.map((exp) => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            {exp.position}
                                        </h3>
                                        <p className="text-lg text-gray-700 dark:text-gray-300">
                                            {exp.company}
                                        </p>
                                    </div>
                                    <div className="text-right text-sm text-gray-600 dark:text-gray-400">
                                        {exp.startDate && (
                                            <div className="flex items-center gap-1 justify-end">
                                                <FaCalendar size={12} />
                                                <span>{formatDateRange(exp.startDate, exp.endDate, exp.current)}</span>
                                            </div>
                                        )}
                                        {exp.location && (
                                            <div className="flex items-center gap-1 justify-end mt-1">
                                                <FaMapMarkerAlt size={12} />
                                                <span>{exp.location}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {exp.description && (
                                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line ml-4">
                                        {exp.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Education Section */}
            {content.education && content.education.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-300 dark:border-gray-600">
                        Education
                    </h2>
                    <div className="space-y-4">
                        {content.education.map((edu) => (
                            <div key={edu.id}>
                                <div className="flex justify-between items-start mb-1">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            {edu.school}
                                        </h3>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            {edu.degree} {edu.field && `in ${edu.field}`}
                                        </p>
                                        {edu.gpa && (
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                GPA: {edu.gpa}
                                            </p>
                                        )}
                                    </div>
                                    {edu.startDate && (
                                        <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                            <FaCalendar size={12} />
                                            <span>{formatDateRange(edu.startDate, edu.endDate)}</span>
                                        </div>
                                    )}
                                </div>
                                {edu.description && (
                                    <p className="text-gray-700 dark:text-gray-300 text-sm ml-4 mt-1">
                                        {edu.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Skills Section */}
            {content.skills && content.skills.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-300 dark:border-gray-600">
                        Skills
                    </h2>
                    <div className="space-y-3">
                        {Object.entries(
                            content.skills.reduce((acc, skill) => {
                                const category = skill.category || 'Other';
                                if (!acc[category]) acc[category] = [];
                                acc[category].push(skill);
                                return acc;
                            }, {})
                        ).map(([category, skills]) => (
                            <div key={category}>
                                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                    {category}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill) => (
                                        <span
                                            key={skill.id}
                                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                                        >
                                            {skill.name}
                                            {skill.level && skill.level !== 'Intermediate' && (
                                                <span className="ml-1 text-xs">({skill.level})</span>
                                            )}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Projects Section */}
            {content.projects && content.projects.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-300 dark:border-gray-600">
                        Projects
                    </h2>
                    <div className="space-y-4">
                        {content.projects.map((project) => (
                            <div key={project.id}>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                                    {project.name}
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-2">
                                    {project.description}
                                </p>
                                {project.technologies && project.technologies.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {project.technologies.map((tech, idx) => (
                                            <span
                                                key={idx}
                                                className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <div className="flex gap-4 text-sm">
                                    {project.projectUrl && (
                                        <a
                                            href={project.projectUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            View Project
                                        </a>
                                    )}
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            GitHub
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Certifications Section */}
            {content.certifications && content.certifications.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-300 dark:border-gray-600">
                        Certifications
                    </h2>
                    <div className="space-y-3">
                        {content.certifications.map((cert) => (
                            <div key={cert.id}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {cert.name}
                                        </h3>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            {cert.organization}
                                        </p>
                                        {cert.credentialId && (
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Credential ID: {cert.credentialId}
                                            </p>
                                        )}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400 text-right">
                                        {cert.issueDate && (
                                            <div>Issued: {formatDate(cert.issueDate)}</div>
                                        )}
                                        {cert.expiryDate && (
                                            <div>Expires: {formatDate(cert.expiryDate)}</div>
                                        )}
                                    </div>
                                </div>
                                {cert.credentialUrl && (
                                    <a
                                        href={cert.credentialUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline text-sm"
                                    >
                                        View Credential
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModernTemplate;
