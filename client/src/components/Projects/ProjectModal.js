import React from 'react';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';

const ProjectModal = ({ project, onClose, isOpen }) => {
    if (!isOpen) return null;

    const { image, date, category, title, description, languages, github, demo } = project;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fadeIn">
            <div 
                className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
                >
                    <FaTimes size={24} />
                </button>

                <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/2">
                        <div className="relative h-64 lg:h-full">
                            <img 
                                src={image} 
                                alt={title} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="lg:w-1/2 p-6 lg:p-8">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm text-gray-500">{date}</span>
                            <span className="text-sm font-medium text-blue-600">{category}</span>
                        </div>

                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{title}</h2>
                        
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                            <p className="text-gray-600">{description}</p>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Technologies Used</h3>
                            <div className="flex flex-wrap gap-2">
                                {languages.map((lang, index) => (
                                    <span 
                                        key={index}
                                        className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800"
                                    >
                                        {lang}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <a 
                                href={github || "#"} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                            >
                                <FaGithub size={20} />
                                <span>View Code</span>
                            </a>
                            <a 
                                href={demo || "#"} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                            >
                                <FaExternalLinkAlt size={18} />
                                <span>Live Demo</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;