import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/editor/Sidebar';
import PersonalInfo from '../components/editor/PersonalInfo';
import About from '../components/editor/About';
import Education from '../components/editor/Education';
import Experience from '../components/editor/Experience';
import Skills from '../components/editor/Skills';
import Certifications from '../components/editor/Certifications';
import Projects from '../components/editor/Projects';
import ResumePreview from '../components/editor/ResumePreview';
import { getResume, updateResume } from '../api/resumeApi';
import { initializeResumeContent } from '../utils/resumeTemplate';

const SECTIONS = ['personal', 'about', 'education', 'experience', 'skills', 'certifications', 'projects'];

export default function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [activeSection, setActiveSection] = useState('personal');
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadResume = async () => {
      try {
        setLoading(true);
        const data = await getResume(id);
        const content = initializeResumeContent(data.content);
        setResume({ ...data, content });
        setError(null);
      } catch (err) {
        console.error('Error loading resume:', err);
        setError('Failed to load resume. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadResume();
  }, [id]);

  const handleSectionChange = (sectionKey, updatedData) => {
    setResume((prevResume) => ({
      ...prevResume,
      content: { ...prevResume.content, [sectionKey]: updatedData },
    }));
  };

  const handleSave = async () => {
    if (!resume) return;
    setSaving(true);
    try {
      await updateResume(resume._id, {
        title: resume.title,
        content: resume.content,
        template: resume.template
      });
      alert('Resume saved successfully!');
    } catch (err) {
      console.error('Error saving resume:', err);
      alert('Failed to save resume. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  const handleTemplateChange = (newTemplate) => {
    setResume(prev => ({ ...prev, template: newTemplate }));
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading editor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={handleBack}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-72 flex-shrink-0">
            <Sidebar
              sections={SECTIONS}
              activeSection={activeSection}
              onSectionChange={setActiveSection}
              onSave={handleSave}
              onPreview={handlePreview}
              onBack={handleBack}
              saving={saving}
            />
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            {activeSection === 'personal' && (
              <PersonalInfo
                data={resume.content.personal}
                onChange={(data) => handleSectionChange('personal', data)}
              />
            )}
            {activeSection === 'about' && (
              <About
                data={resume.content.about}
                onChange={(data) => handleSectionChange('about', data)}
              />
            )}
            {activeSection === 'education' && (
              <Education
                data={resume.content.education}
                onChange={(data) => handleSectionChange('education', data)}
              />
            )}
            {activeSection === 'experience' && (
              <Experience
                data={resume.content.experience}
                onChange={(data) => handleSectionChange('experience', data)}
              />
            )}
            {activeSection === 'skills' && (
              <Skills
                data={resume.content.skills}
                onChange={(data) => handleSectionChange('skills', data)}
              />
            )}
            {activeSection === 'certifications' && (
              <Certifications
                data={resume.content.certifications}
                onChange={(data) => handleSectionChange('certifications', data)}
              />
            )}
            {activeSection === 'projects' && (
              <Projects
                data={resume.content.projects}
                onChange={(data) => handleSectionChange('projects', data)}
              />
            )}
          </main>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <ResumePreview
          resume={resume}
          onClose={handleClosePreview}
          onTemplateChange={handleTemplateChange}
        />
      )}
    </div>
  );
}
