import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Contact.css';

const ContactCard = ({ Icon, title, value, link, delay }) => (
    <a 
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg 
            transition-all duration-300 transform hover:-translate-y-1
            opacity-0 animate-fadeIn"
        style={{ animationDelay: `${delay}ms` }}
    >
        <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
                <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 group-hover:text-blue-600 transition-colors" />
            </div>
            <div>
                <h3 className="text-sm sm:text-base font-medium text-gray-500">{title}</h3>
                <p className="text-base sm:text-lg font-semibold text-gray-900">{value}</p>
            </div>
        </div>
    </a>
);

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate form submission
        setTimeout(() => {
            setSubmitStatus('success');
            setIsSubmitting(false);
            setFormData({ name: '', email: '', message: '' });
            
            // Reset status after 3 seconds
            setTimeout(() => setSubmitStatus(null), 3000);
        }, 1000);
    };

    const contactInfo = [
        {
            Icon: FaEnvelope,
            title: 'Email',
            value: 'mondaldev75@gmail.com',
            link: 'mailto:mondaldev75@gmail.com',
            delay: 100
        },
        {
            Icon: FaGithub,
            title: 'GitHub',
            value: 'DevxD98',
            link: 'https://github.com/DevxD98',
            delay: 200
        },
        {
            Icon: FaLinkedin,
            title: 'LinkedIn',
            value: 'Dev Mondal',
            link: 'https://www.linkedin.com/feed/',
            delay: 300
        },
        {
            Icon: FaMapMarkerAlt,
            title: 'Location',
            value: 'Kolkata, India',
            link: 'https://maps.google.com/?q=Kolkata,India',
            delay: 400
        }
    ];

    return (
        <section id="contact" className="min-h-screen bg-gray-50 py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16 opacity-0 animate-fadeIn">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Get in Touch
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                        I'm always open to new opportunities and collaborations. 
                        Feel free to reach out!
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    {/* Contact Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-12">
                        {contactInfo.map((info) => (
                            <ContactCard key={info.title} {...info} />
                        ))}
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 opacity-0 animate-fadeIn"
                        style={{ animationDelay: '500ms' }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 
                                        focus:ring-blue-500 sm:text-sm transition-colors"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 
                                        focus:ring-blue-500 sm:text-sm transition-colors"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 
                                        focus:ring-blue-500 sm:text-sm transition-colors"
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full sm:w-auto px-6 py-3 border border-transparent rounded-md shadow-sm 
                                        text-base font-medium text-white bg-blue-600 hover:bg-blue-700 
                                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                                        transition-colors ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </div>
                        </form>

                        {/* Success/Error Message */}
                        {submitStatus && (
                            <div className={`mt-4 p-4 rounded-md ${
                                submitStatus === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                            }`}>
                                {submitStatus === 'success' 
                                    ? 'Message sent successfully!' 
                                    : 'Failed to send message. Please try again.'}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact; 