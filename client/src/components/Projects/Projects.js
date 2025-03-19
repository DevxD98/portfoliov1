import React, { useState } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import ProjectModal from './ProjectModal';
import './Projects.css';

const ProjectCard = ({ project, onClick }) => {
    const { image, date, category, title, description, languages, github, demo } = project;
    return (
        <div 
            className="min-w-[280px] md:min-w-[340px] lg:min-w-[380px] bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 project-card cursor-pointer"
            onClick={onClick}
        >
            <div className="relative h-40 sm:h-48 overflow-hidden">
                <img 
                    src={image} 
                    alt={title} 
                    className="w-full h-full object-cover project-image"
                />
            </div>
            <div className="p-4 sm:p-6">
                <div className="flex justify-between items-center mb-3 sm:mb-4">
                    <span className="text-xs sm:text-sm text-gray-500">{date}</span>
                    <span className="text-xs sm:text-sm font-medium text-blue-600">{category}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2">{description}</p>
                <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                        {languages.map((lang, index) => (
                            <span 
                                key={index}
                                className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800"
                            >
                                {lang}
                            </span>
                        ))}
                    </div>
                    <div className="flex justify-end space-x-2">
                        <a href={github || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
                            <FaGithub size={18} className="sm:w-5 sm:h-5" />
                        </a>
                        <a href={demo || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
                            <FaExternalLinkAlt size={18} className="sm:w-5 sm:h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const projects = [
        {
            image: require('../../assets/Capture-2025-03-18-124915.png'),
            date: 'Mar 15, 2025',
            category: 'Development',
            title: 'Portfolio Website',
            description: 'A modern portfolio website built with React and Tailwind CSS, featuring dynamic content and smooth animations.',
            languages: ['React', 'Tailwind CSS', 'JavaScript', 'vantajs'],
            github: 'https://github.com/DevxD98/portfolio-demo',
            demo: 'https://portfolio-demo-devxd98.vercel.app'
        },
        {
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3',
            date: 'Mar 10, 2024',
            category: 'Design',
            title: 'E-commerce Dashboard',
            description: 'A comprehensive dashboard for e-commerce analytics with real-time data visualization.',
            languages: ['React', 'Redux', 'Chart.js', 'TypeScript'],
            github: 'https://github.com/DevxD98/ecommerce-dashboard',
            demo: 'https://ecommerce-dashboard-devxd98.vercel.app'
        },
        {
            image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3',
            date: 'Mar 05, 2024',
            category: 'AI/ML',
            title: 'AI Image Generator',
            description: 'An AI-powered image generation tool using state-of-the-art machine learning models.',
            languages: ['Python', 'TensorFlow', 'OpenAI API'],
            github: 'https://github.com/DevxD98/ai-image-generator',
            demo: 'https://ai-image-generator-devxd98.vercel.app'
        },
        {
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3',
            date: 'Mar 01, 2024',
            category: 'Mobile',
            title: 'Fitness Tracking App',
            description: 'A cross-platform mobile application for tracking workouts and maintaining fitness goals.',
            languages: ['React Native', 'Firebase', 'Node.js'],
            github: 'https://github.com/DevxD98/fitness-tracking-app',
            demo: 'https://fitness-tracking-app-devxd98.vercel.app'
        }
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full px-3 sm:px-4 md:px-6">
                <div className="max-w-[90rem] mx-auto">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">My Projects</h2>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600">A collection of my recent work and contributions.</p>
                    </div>
                    
                    {/* Scrollable Projects Container */}
                    <div className="relative">
                        {/* Left Gradient Fade */}
                        <div className="absolute left-0 top-0 bottom-0 w-4 sm:w-8 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
                        
                        {/* Projects Scroll Container */}
                        <div className="flex space-x-4 sm:space-x-6 overflow-x-auto pb-6 sm:pb-8 px-4 sm:px-8 scrollbar-hide items-center">
                            {projects.map((project, index) => (
                                <ProjectCard 
                                    key={index} 
                                    project={project}
                                    onClick={() => setSelectedProject(project)}
                                />
                            ))}
                        </div>
                        
                        {/* Right Gradient Fade */}
                        <div className="absolute right-0 top-0 bottom-0 w-4 sm:w-8 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
                    </div>
                </div>
            </div>
            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    isOpen={true}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </div>
    );
};

export default Projects;
