import React from 'react';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaGlobe, FaMapMarkerAlt } from 'react-icons/fa';

const ProfessionalTemplate = ({ content, formatDate, formatDateRange }) => {
    return (
        <div className="bg-white text-gray-800 flex min-h-[1000px] shadow-lg max-w-3xl mx-auto" id="resume-content">
            {/* Left Sidebar */}
            <div className="w-1/3 bg-slate-800 text-white p-6 flex flex-col gap-6">
                {/* Contact Info */}
                <div>
                    <h2 className="text-lg font-bold uppercase tracking-wider border-b border-slate-600 pb-2 mb-4 text-slate-300">Contact</h2>
                    <div className="flex flex-col gap-3 text-sm text-slate-300">
                        {content.personal?.email && (
                            <div className="flex items-center gap-2">
                                <FaEnvelope className="flex-shrink-0" />
                                <span className="break-all">{content.personal.email}</span>
                            </div>
                        )}
                        {content.personal?.phone && (
                            <div className="flex items-center gap-2">
                                <FaPhone className="flex-shrink-0" />
                                <span>{content.personal.phone}</span>
                            </div>
                        )}
                        {content.personal?.location && (
                            <div className="flex items-center gap-2">
                                <FaMapMarkerAlt className="flex-shrink-0" />
                                <span>{content.personal.location}</span>
                            </div>
                        )}
                        {content.personal?.linkedin && (
                            <div className="flex items-center gap-2">
                                <FaLinkedin className="flex-shrink-0" />
                                <a href={content.personal.linkedin} className="hover:text-white">LinkedIn</a>
                            </div>
                        )}
                        {content.personal?.github && (
                            <div className="flex items-center gap-2">
                                <FaGithub className="flex-shrink-0" />
                                <a href={content.personal.github} className="hover:text-white">GitHub</a>
                            </div>
                        )}
                        {content.personal?.website && (
                            <div className="flex items-center gap-2">
                                <FaGlobe className="flex-shrink-0" />
                                <a href={content.personal.website} className="hover:text-white">Portfolio</a>
                            </div>
                        )}
                    </div>
                </div>

                {/* Skills */}
                {content.skills && content.skills.length > 0 && (
                    <div>
                        <h2 className="text-lg font-bold uppercase tracking-wider border-b border-slate-600 pb-2 mb-4 text-slate-300">Skills</h2>
                        <div className="flex flex-col gap-4">
                            {Object.entries(
                                content.skills.reduce((acc, skill) => {
                                    const category = skill.category || 'Other';
                                    if (!acc[category]) acc[category] = [];
                                    acc[category].push(skill.name);
                                    return acc;
                                }, {})
                            ).map(([category, skills]) => (
                                <div key={category}>
                                    <h3 className="text-sm font-semibold text-slate-200 mb-1">{category}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.map((skill, idx) => (
                                            <span key={idx} className="text-xs bg-slate-700 px-2 py-1 rounded text-slate-300">
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
                        <h2 className="text-lg font-bold uppercase tracking-wider border-b border-slate-600 pb-2 mb-4 text-slate-300">Education</h2>
                        <div className="flex flex-col gap-4">
                            {content.education.map((edu) => (
                                <div key={edu.id}>
                                    <h3 className="font-bold text-white">{edu.school}</h3>
                                    <div className="text-sm text-slate-300">{edu.degree}</div>
                                    <div className="text-xs text-slate-400 mt-1">
                                        {formatDateRange(edu.startDate, edu.endDate)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="w-2/3 p-8 bg-white">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-slate-800 uppercase tracking-tight mb-2">
                        {content.personal?.name || 'Your Name'}
                    </h1>
                    {content.personal?.title && (
                        <p className="text-xl text-slate-600">{content.personal.title}</p>
                    )}
                </div>

                {/* Summary */}
                {content.about && (
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-slate-800 uppercase tracking-wider border-b-2 border-slate-200 pb-2 mb-4">
                            Profile
                        </h2>
                        <p className="text-slate-700 leading-relaxed">
                            {content.about}
                        </p>
                    </div>
                )}

                {/* Experience */}
                {content.experience && content.experience.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-slate-800 uppercase tracking-wider border-b-2 border-slate-200 pb-2 mb-4">
                            Work Experience
                        </h2>
                        <div className="flex flex-col gap-6">
                            {content.experience.map((exp) => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-lg font-bold text-slate-800">{exp.position}</h3>
                                        <span className="text-sm text-slate-500 font-medium">
                                            {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                                        </span>
                                    </div>
                                    <div className="text-slate-600 font-medium mb-2">{exp.company}, {exp.location}</div>
                                    {exp.description && (
                                        <p className="text-slate-700 text-sm whitespace-pre-line leading-relaxed">
                                            {exp.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Projects */}
                {content.projects && content.projects.length > 0 && (
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 uppercase tracking-wider border-b-2 border-slate-200 pb-2 mb-4">
                            Projects
                        </h2>
                        <div className="flex flex-col gap-4">
                            {content.projects.map((project) => (
                                <div key={project.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-slate-800">{project.name}</h3>
                                        <div className="flex gap-3 text-sm">
                                            {project.projectUrl && <a href={project.projectUrl} className="text-blue-600 hover:underline">View</a>}
                                            {project.githubUrl && <a href={project.githubUrl} className="text-blue-600 hover:underline">Code</a>}
                                        </div>
                                    </div>
                                    <p className="text-slate-700 text-sm mb-1">{project.description}</p>
                                    {project.technologies && (
                                        <p className="text-xs text-slate-500">
                                            <span className="font-semibold">Tech:</span> {project.technologies.join(', ')}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfessionalTemplate;
